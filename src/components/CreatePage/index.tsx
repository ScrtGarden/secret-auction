import { endOfDay, getUnixTime } from 'date-fns'
import { FC, useContext, useReducer, useState } from 'react'

import { AlertType } from '../../../store/controls/controls.models'
import {
  CREATE_AUCTION_MAX_GAS,
  FACTORY_CONTRACT_ADDRESS,
  INCREASE_ALLOWANCE_MAX_GAS,
} from '../../../utils/constants'
import { useStoreActions } from '../../../utils/hooks/storeHooks'
import useConnectToKeplr from '../../../utils/hooks/useConnectToKeplr'
import keplr from '../../../utils/keplr'
import parseErrorMessage from '../../../utils/parseErrorMessage'
import reducer from '../../../utils/reducer'
import { SecretJsContext } from '../../../utils/secretjs'
import toSmallestDenomination from '../../../utils/toSmallestDenomination'
import validate from '../../../utils/validators/createAuction'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import CreateForm from './CreateForm'
import ProgressStepper from './ProgressStepper'
import { Grid } from './styles'

export type Contract = {
  address: string
  amount: string
  decimals: number
}

export type ContractErrors = {
  address: string
  amount: string
}

export type ConsignData = {
  contractAddress: string
  tokenAddress: string
  amount: string
}

const initialContractState: Contract = {
  address: '',
  amount: '',
  decimals: -1,
}

const initContractErrors: ContractErrors = {
  address: '',
  amount: '',
}

const CreatePage: FC = () => {
  const { secretjs: client } = useContext(SecretJsContext)

  // store actions
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)

  // custom hooks
  const [connectToKeplr] = useConnectToKeplr()

  // component states
  const [sellContract, setSellContract] = useReducer(
    reducer,
    initialContractState
  )
  const [exchangeForContract, setExchangeForContract] = useReducer(
    reducer,
    initialContractState
  )
  const [description, setDescription] = useState('')
  const [endDate, setEndDate] = useState(endOfDay(new Date()))
  const [sellContractErrors, setSellContractErrors] = useReducer(
    reducer,
    initContractErrors
  )
  const [exchangeForContractErrors, setExchangeForContractErrors] = useReducer(
    reducer,
    initContractErrors
  )
  const [loading, setLoading] = useState(false)
  const [txInfo, setTxInfo] = useState({
    address: '',
    txHash: '',
  })
  const [step, setStep] = useState(-1)

  const onSubmit = async () => {
    const { hasError, sell, want } = validate({
      sell: sellContract,
      want: exchangeForContract,
    })

    setSellContractErrors(sell)
    setExchangeForContractErrors(want)

    if (hasError) {
      return
    }

    setLoading(true)

    // try to connect to keplr
    const { error: connectionError } = await connectToKeplr()

    if (connectionError) {
      setLoading(false)
      return
    }

    // trigger allowance command
    setStep(0)
    const { secretjs: signingClientOne } = await keplr.createSigningClient({
      maxGas: INCREASE_ALLOWANCE_MAX_GAS,
    })
    const sellAmountInSmallestDenomination = toSmallestDenomination(
      sellContract.amount,
      sellContract.decimals
    )
    const handleMsgIncreaseAllowance = {
      increase_allowance: {
        spender: FACTORY_CONTRACT_ADDRESS,
        amount: sellAmountInSmallestDenomination,
      },
    }

    try {
      const response = await signingClientOne?.execute(
        sellContract.address,
        handleMsgIncreaseAllowance
      )
      // console.log(response)
    } catch (error) {
      console.log('Error giving allowance:', error.message)
      const text = parseErrorMessage(error.message)
      setAlert({
        title: 'Error',
        text,
        type: AlertType.error,
      })
      setStep(-1)
      setLoading(false)
      return
    }

    // trigger create auction command
    setStep(1)
    const { error } = await createAuction()

    if (!error) {
      setStep(2)
      resetForms()
    }

    setLoading(false)
  }

  const tryCreateAuctionAgain = async () => {
    setLoading(true)

    const { error } = await createAuction()

    if (!error) {
      setStep(2)
      resetForms()
    }

    setLoading(false)
  }

  const getCodeHash = async (address: string) => {
    try {
      const codeHash = await client?.getCodeHashByContractAddr(address)
      return { codeHash }
    } catch (error) {
      console.log(
        'Cannot find code hash with sell token contract address',
        error
      )
      return { error: { message: 'Cannot find code hash with this address.' } }
    }
  }

  const createAuction = async () => {
    // get code hash from sell snip-20 contract addresses
    const {
      error: sellCodeHashError,
      codeHash: sellCodeHash,
    } = await getCodeHash(sellContract.address)
    if (sellCodeHashError) {
      return { codeHashError: { sell: true } }
    }

    // get code hash from bid snip-20 contract addresses
    const {
      error: bidCodeHashError,
      codeHash: bidCodeHash,
    } = await getCodeHash(exchangeForContract.address)
    if (bidCodeHashError) {
      return { codeHashError: { bid: true } }
    }

    // set up data for auction creation
    const sellAmountInSmallestDenomination = toSmallestDenomination(
      sellContract.amount,
      sellContract.decimals
    )
    const bidAmountInSmallestDenomination = toSmallestDenomination(
      exchangeForContract.amount,
      exchangeForContract.decimals
    )
    const label = `test-auction-${Math.floor(Math.random() * 10000)}`
    const handleMsg = {
      create_auction: {
        label,
        sell_contract: {
          code_hash: sellCodeHash || '',
          address: sellContract.address,
        },
        bid_contract: {
          code_hash: bidCodeHash || '',
          address: exchangeForContract.address,
        },
        sell_amount: sellAmountInSmallestDenomination,
        minimum_bid: bidAmountInSmallestDenomination,
        description: description,
        ends_at: getUnixTime(endOfDay(endDate)),
      },
    }
    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: CREATE_AUCTION_MAX_GAS,
    })

    try {
      const response = await signingClient?.execute(
        FACTORY_CONTRACT_ADDRESS,
        handleMsg
      )
      const address =
        response?.logs[0].events
          .find((item) => item.type === 'wasm')
          ?.attributes.concat()
          .reverse()
          .find((item) => item.key === 'contract_address')?.value || ''

      setTxInfo({ address, txHash: response?.transactionHash || '' })
      return { ...response }
    } catch (error) {
      console.log('Error creating:', error.message)
      const text = parseErrorMessage(error.message)
      setAlert({
        title: 'Error',
        text,
        type: AlertType.error,
      })

      return { error: { message: error.message } }
    }
  }

  const resetForms = () => {
    setSellContract(initialContractState)
    setExchangeForContract(initialContractState)
    setDescription('')
    setEndDate(endOfDay(new Date()))
  }

  return (
    <Container>
      <InnerContainer>
        <StyledTitle>Create an auction</StyledTitle>
        <CreateForm
          sellData={sellContract}
          onChangeSell={setSellContract}
          bidData={exchangeForContract}
          onChangeBid={setExchangeForContract}
          date={endDate}
          setDate={setEndDate}
          description={description}
          onChangeDescription={setDescription}
          onSubmit={onSubmit}
          sellContractErrors={sellContractErrors}
          bidContractErrors={exchangeForContractErrors}
          setSellContractErrors={setSellContractErrors}
          setBidContractErrors={setExchangeForContractErrors}
          loading={loading}
        />
        <Grid>
          <div />
          <div />
          {step !== -1 && (
            <ProgressStepper
              step={step}
              loading={loading}
              onClick={tryCreateAuctionAgain}
              txInfo={txInfo}
            />
          )}
        </Grid>
      </InnerContainer>
    </Container>
  )
}

export default CreatePage
