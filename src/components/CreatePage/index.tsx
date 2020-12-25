import { Alert, Close, Title } from '@zendeskgarden/react-notifications'
import { Code } from '@zendeskgarden/react-typography'
import { FC, useReducer, useState } from 'react'

import { useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
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
  codeHash: string
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
  codeHash: '',
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
  const [cosignData, setCosignData] = useState<ConsignData>({
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

    const { error, secretjs } = await keplr.sign()

    if (error) {
      console.log('Error signing.', error.message)
      setLoading(false)
      return
    }

    if (!secretjs) {
      console.log('Error creating secretjs instance.')
      setLoading(false)
      return
    }

    const body = {
      sell_contract: {
        code_hash: sellContract.codeHash.trim(),
        address: sellContract.address.trim(),
      },
      bid_contract: {
        code_hash: exchangeForContract.codeHash.trim(),
        address: exchangeForContract.address.trim(),
      },
      sell_amount: sellContract.amount,
      minimum_bid: exchangeForContract.amount,
      description: description,
    }

    try {
      const response = await secretjs.instantiate(
        102,
        body,
        `test-auction-${Math.floor(Math.random() * 10000)}`
      )

      setCosignData({
        contractAddress: response.contractAddress,
        tokenAddress: sellContract.address.trim(),
        amount: sellContract.amount,
      })

      setVisible(true)
    } catch (error) {
      console.log('Error instantiating', error.message)
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
          Not too sure what happened but here's the response dump:
          <br />
          <Code hue="red">{failed}</Code>
          <Close aria-label="Close Alert" onClick={() => setFailed('')} />
        </StyledAlert>
      )}
    </Container>
  )
}

export default CreatePage
