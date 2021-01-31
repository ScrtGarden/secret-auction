import { getUnixTime } from 'date-fns'
import { FC, useContext, useReducer, useState } from 'react'

import { AlertType } from '../../../store/controls/controls.models'
import {
  CREATE_AUCTION_MAX_GAS,
  FACTORY_CONTRACT_ADDRESS,
  INCREASE_ALLOWANCE_MAX_GAS,
  TOKENS,
} from '../../../utils/constants'
import { useStoreActions } from '../../../utils/hooks/storeHooks'
import useConnectToKeplr from '../../../utils/hooks/useConnectToKeplr'
import keplr from '../../../utils/keplr'
import parseErrorMessage from '../../../utils/parseErrorMessage'
import reducer from '../../../utils/reducer'
import { SecretJsContext } from '../../../utils/secretjs'
import toSmallestDenomination from '../../../utils/toSmallestDenomination'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import Form from './Form'
import ProgressStepper from './ProgressStepper'
import { Grid } from './styles'

const defaultToken = 'tsdai'

export interface TargetTokenData {
  selected: string
  amount: string
}

const initialTokenState: TargetTokenData = {
  selected: defaultToken,
  amount: '',
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

const CreatePage: FC = () => {
  const { secretjs: client } = useContext(SecretJsContext)

  // store actions
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)

  // custom hooks
  const [connectToKeplr] = useConnectToKeplr()

  // component states
  const [tokens, setTokens] = useReducer(reducer, TOKENS)
  const [sellData, setSellData] = useReducer(reducer, initialTokenState)
  const [bidData, setBidData] = useReducer(reducer, initialTokenState)
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [txInfo, setTxInfo] = useState({
    address: '',
    txHash: '',
  })
  const [step, setStep] = useState(-1)

  const onSubmit = async () => {
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
      sellData.amount,
      tokens[sellData.selected].decimals
    )
    const handleMsgIncreaseAllowance = {
      increase_allowance: {
        spender: FACTORY_CONTRACT_ADDRESS,
        amount: sellAmountInSmallestDenomination,
      },
    }

    try {
      const response = await signingClientOne?.execute(
        tokens[sellData.selected].address,
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
    } = await getCodeHash(tokens[sellData.selected].address)
    if (sellCodeHashError) {
      return { codeHashError: { sell: true } }
    }

    // get code hash from bid snip-20 contract addresses
    const {
      error: bidCodeHashError,
      codeHash: bidCodeHash,
    } = await getCodeHash(tokens[bidData.selected].address)
    if (bidCodeHashError) {
      return { codeHashError: { bid: true } }
    }

    // set up data for auction creation
    const sellAmountInSmallestDenomination = toSmallestDenomination(
      sellData.amount,
      tokens[sellData.selected].decimals
    )
    const bidAmountInSmallestDenomination = toSmallestDenomination(
      bidData.amount,
      tokens[bidData.selected].decimals
    )
    const label = `test-auction-${Math.floor(Math.random() * 10000)}`
    const handleMsg = {
      create_auction: {
        label,
        sell_contract: {
          code_hash: sellCodeHash || '',
          address: tokens[sellData.selected].address,
        },
        bid_contract: {
          code_hash: bidCodeHash || '',
          address: tokens[bidData.selected].address,
        },
        sell_amount: sellAmountInSmallestDenomination,
        minimum_bid: bidAmountInSmallestDenomination,
        description: description,
        ends_at: getUnixTime(date),
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
    setSellData(initialTokenState)
    setBidData(initialTokenState)
    setDescription('')
    setDate(new Date())
  }

  return (
    <Container>
      <InnerContainer>
        <StyledTitle>Create an auction</StyledTitle>
        <Grid>
          <Form
            loading={loading}
            onSubmit={onSubmit}
            sellData={sellData}
            setSellData={setSellData}
            bidData={bidData}
            setBidData={setBidData}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            tokens={tokens}
            setTokens={setTokens}
            step={step}
          />
          <ProgressStepper
            step={step}
            loading={loading}
            onClick={tryCreateAuctionAgain}
            txInfo={txInfo}
          />
        </Grid>
      </InnerContainer>
    </Container>
  )
}

export default CreatePage
