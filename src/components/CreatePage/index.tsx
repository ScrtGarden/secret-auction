import { Close, Title } from '@zendeskgarden/react-notifications'
import { Code } from '@zendeskgarden/react-typography'
import { getUnixTime } from 'date-fns'
import { endOfDay } from 'date-fns'
import { FC, useContext, useReducer, useState } from 'react'

import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
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
import { Grid, StyledAlert } from './styles'

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
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)

  // store states
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

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
  const [exchangeForContractErrors, setExchangeForContractErorrs] = useReducer(
    reducer,
    initContractErrors
  )
  const [loading, setLoading] = useState(false)
  const [auctionContractAddress, setAuctionContractAddress] = useState('')

  const [failed, setFailed] = useState('')
  const [step, setStep] = useState(-1)

  const onSubmit = async () => {
    setFailed('')

    const { hasError, sell, want } = validate({
      sell: sellContract,
      want: exchangeForContract,
    })

    setSellContractErrors(sell)
    setExchangeForContractErorrs(want)

    if (hasError) {
      return
    }

    setLoading(true)

    // if not connected, trigger keplr pop up
    if (!isConnected) {
      // promise does not get resolved when user is shown screen to unlock wallet
      // and then closes keplr pop up
      const connect = await keplr.connect()

      if (connect.success) {
        const accountsResponse = await keplr.getAccounts()
        if (accountsResponse.accounts) {
          setAccounts(accountsResponse.accounts)
        }
      } else if (connect.error?.message === 'Kelpr not installed.') {
        console.log('Kelpr not installed.')
        setLoading(false)
        return
      } else {
        console.log('Did not accept approval from Keplr.')
        setAccounts([])
        setLoading(false)
        return
      }
    }

    // get code hash from supplied snip-20 contract addresses
    let sellCodeHash
    let exchangeForCodeHash

    try {
      sellCodeHash = await client?.getCodeHashByContractAddr(
        sellContract.address
      )
    } catch (error) {
      console.log(
        'Cannot find code hash with sell token contract address',
        error
      )
      setSellContractErrors({
        address: 'Cannot find code hash with this address.',
      })
      setLoading(false)
      return
    }

    try {
      exchangeForCodeHash = await client?.getCodeHashByContractAddr(
        exchangeForContract.address
      )
    } catch (error) {
      console.log(
        'Cannot find code hash with exchange for token contract address',
        error
      )
      setExchangeForContractErorrs({
        address: 'Cannot find code hash with this address.',
      })
      setLoading(false)
      return
    }

    // trigger allowance command
    setStep(0)
    const { secretjs: signingClientOne } = await keplr.createSigningClient({
      maxGas: '150000',
    })
    const sellAmountAtSmallestDenomination = toSmallestDenomination(
      sellContract.amount,
      sellContract.decimals
    )
    const handleMsgIncreaseAllowance = {
      increase_allowance: {
        spender: FACTORY_CONTRACT_ADDRESS,
        amount: sellAmountAtSmallestDenomination,
      },
    }
    // console.log(handleMsgIncreaseAllowance)

    try {
      const response = await signingClientOne?.execute(
        sellContract.address,
        handleMsgIncreaseAllowance
      )
      // console.log(response)
    } catch (error) {
      console.log('Error giving allowance:', error.message)
      setFailed(error.message)
      setStep(-1)
      setLoading(false)
      return
    }

    // trigger create auction command
    setStep(1)
    const { secretjs: signingClientTwo } = await keplr.createSigningClient({
      maxGas: '600000',
    })
    const bidAmountAtSmallestDenomination = toSmallestDenomination(
      exchangeForContract.amount,
      exchangeForContract.decimals
    )
    const label = `test-auction-${Math.floor(Math.random() * 10000)}`
    const handleMsg = {
      create_auction: {
        label,
        sell_contract: {
          code_hash: sellCodeHash,
          address: sellContract.address,
        },
        bid_contract: {
          code_hash: exchangeForCodeHash,
          address: exchangeForContract.address,
        },
        sell_amount: sellAmountAtSmallestDenomination,
        minimum_bid: bidAmountAtSmallestDenomination,
        description: description,
        ends_at: getUnixTime(endOfDay(endDate)),
      },
    }
    // console.log(handleMsg)

    try {
      const response = await signingClientTwo?.execute(
        FACTORY_CONTRACT_ADDRESS,
        handleMsg
      )
      // console.log(response)
      // const result = decoder(response?.data)
      // console.log(result)
    } catch (error) {
      console.log('Error creating:', error.message)
      setFailed(error.message)
      setLoading(false)
      setStep(-1)
      return
    }

    setLoading(false)
    setStep(2)
    resetForms()
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
          setBidContractErrors={setExchangeForContractErorrs}
          loading={loading}
        />
        <Grid>
          <div />
          <div />
          {step !== -1 && <ProgressStepper step={step} />}
        </Grid>
      </InnerContainer>
      {failed && (
        <StyledAlert type="error">
          <Title>Oopsie</Title>
          <Code hue="red">{failed}</Code>
          <Close aria-label="Close Alert" onClick={() => setFailed('')} />
        </StyledAlert>
      )}
    </Container>
  )
}

export default CreatePage
