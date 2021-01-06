import { Close, Title } from '@zendeskgarden/react-notifications'
import { Code } from '@zendeskgarden/react-typography'
import { getUnixTime } from 'date-fns'
import { endOfDay } from 'date-fns/esm'
import { FC, useContext, useReducer, useState } from 'react'

import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import useSecretJs from '../../../utils/hooks/useSecretJs'
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
import CreatedAuctionModal from '../CreatedAuctionModal'
import Confirm from './Confirm'
import CreateForm from './CreateForm'
import Header from './Header'
import ProgressStepper from './ProgressStepper'
import { Forms, StyledAlert, Wrapper } from './styles'
import TokenForm from './TokenForm'

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

  // custom hooks
  const { error, secretjs } = useSecretJs()

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
  const [endDate, setEndDate] = useState(new Date())
  const [sellContractErrors, setSellContractErrors] = useReducer(
    reducer,
    initContractErrors
  )
  const [exchangeForContractErrors, setExchangeForContractErorrs] = useReducer(
    reducer,
    initContractErrors
  )
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const [cosignData, setConsignData] = useState<ConsignData>({
    contractAddress: '',
    tokenAddress: '',
    amount: '',
  })
  const [failed, setFailed] = useState('')
  const [step, setStep] = useState(-1)

  const onSubmit = async () => {
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

    // create signing client
    const { secretjs: signingClient } = await keplr.createSigningClient()

    // trigger allowance command
    const sellAmountAtSmallestDenomination = toSmallestDenomination(
      sellContract.amount,
      sellContract.decimals
    )
    const handleMsgIncreaseAllowance = {
      increase_allowance: {
        spender: 'secret1n8d8ma2ae4fgchw2wdvfvtwsy7pa4h02u93m9m',
        amount: sellAmountAtSmallestDenomination,
      },
    }
    console.log(handleMsgIncreaseAllowance)
    try {
      const response = await signingClient?.execute(
        sellContract.address,
        handleMsgIncreaseAllowance
      )
      console.log(response)
    } catch (error) {
      console.log('Error giving permission:', error.message)
      setLoading(false)
      return
    }

    // trigger create auction command
    const bidAmountAtSmallestDenomination = toSmallestDenomination(
      exchangeForContract.amount,
      exchangeForContract.decimals
    )
    const handleMsg = {
      create_auction: {
        label: `test-auction-${Math.floor(Math.random() * 10000)}`,
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

    console.log(handleMsg)

    try {
      const response = await signingClient?.execute(
        FACTORY_CONTRACT_ADDRESS,
        handleMsg
      )
      console.log(response)
    } catch (error) {
      console.log('Error creating:', error.message)
      setFailed(error.message)
    }

    console.log('!!! Finished !!!')
    setLoading(false)
  }

  const resetForms = () => {
    setSellContract(initialContractState)
    setExchangeForContract(initialContractState)
    setDescription('')
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
        <ProgressStepper step={step} />
      </InnerContainer>
      {visible && (
        <CreatedAuctionModal
          data={cosignData}
          setVisible={setVisible}
          resetForms={resetForms}
        />
      )}
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
