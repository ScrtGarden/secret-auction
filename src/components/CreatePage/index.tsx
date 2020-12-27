import { Close, Title } from '@zendeskgarden/react-notifications'
import { Code } from '@zendeskgarden/react-typography'
import { FC, useReducer, useState } from 'react'

import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreState } from '../../../utils/hooks/storeHooks'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import reducer from '../../../utils/reducer'
import validate from '../../../utils/validators/createAuction'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import CreatedAuctionModal from '../CreatedAuctionModal'
import Confirm from './Confirm'
import Header from './Header'
import { Forms, StyledAlert } from './styles'
import TokenForm from './TokenForm'

export type Contract = {
  address: string
  amount: string
}

export type ContractErrors = {
  codeHash: string
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
}

const initContractErrors: ContractErrors = {
  codeHash: '',
  address: '',
  amount: '',
}

const CreatePage: FC = () => {
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const { error, secretjs } = useSecretJs()

  const [sellContract, setSellContract] = useReducer(
    reducer,
    initialContractState
  )
  const [exchangeForContract, setExchangeForContract] = useReducer(
    reducer,
    initialContractState
  )
  const [description, setDescription] = useState('')
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

    if (error) {
      console.log('Error signing.', error.message)
      setLoading(false)
      return
    }

    if (!secretjs) {
      console.log('Error creating secretjs client.')
      setLoading(false)
      return
    }

    let sellCodeHash = ''
    let exchangeForCodeHash = ''
    try {
      sellCodeHash = await secretjs.getCodeHashByContractAddr(
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
      exchangeForCodeHash = await secretjs.getCodeHashByContractAddr(
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

    const body = {
      create_auction: {
        label: `test-auction-${Math.floor(Math.random() * 10000)}`,
        sell_contract: {
          code_hash: sellCodeHash,
          address: sellContract.address.trim(),
        },
        bid_contract: {
          code_hash: exchangeForCodeHash,
          address: exchangeForContract.address.trim(),
        },
        sell_amount: sellContract.amount,
        minimum_bid: exchangeForContract.amount,
        description: description,
      },
    }

    try {
      const response = await secretjs.execute(FACTORY_CONTRACT_ADDRESS, body)
      const contractAddress =
        response.logs[0].events
          .find((item) => item.type === 'message')
          ?.attributes.find((item) => item.key === 'contract_address')?.value ||
        ''

      setConsignData({
        contractAddress,
        tokenAddress: sellContract.address.trim(),
        amount: sellContract.amount,
      })

      setVisible(true)
    } catch (error) {
      console.log('Error creating:', error.message)
      setFailed(error.message)
    }

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
        <Header />
        <Forms>
          <TokenForm
            title="YOUR BAG"
            data={sellContract}
            errors={sellContractErrors}
            onChange={setSellContract}
            onBlur={(key) => setSellContractErrors({ [key]: '' })}
            isConnected={isConnected}
          />
          <TokenForm
            title="YOU WANT"
            amountLabel="Minimum Amount"
            data={exchangeForContract}
            errors={exchangeForContractErrors}
            onChange={setExchangeForContract}
            onBlur={(key) => setExchangeForContractErorrs({ [key]: '' })}
            isConnected={isConnected}
          />
          <Confirm
            value={description}
            onChange={setDescription}
            onSubmit={onSubmit}
            loading={loading}
            isConnected={isConnected}
          />
        </Forms>
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
