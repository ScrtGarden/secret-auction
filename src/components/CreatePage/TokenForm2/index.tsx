import { Field, Input, InputGroup, Label } from '@zendeskgarden/react-forms'
import { Dots } from '@zendeskgarden/react-loaders'
import { Dispatch, FC, FormEvent, memo, useContext, useState } from 'react'

import { TokenInfo } from '../../../../interfaces'
import { SecretJsContext } from '../../../../utils/secretjs'
import { Separator, StyledMessage } from '../../Common/StyledComponents'
import { SetContractState } from '../CreateForm'
import { StyledButton, TokenLabel } from './styles'
import { Contract, ContractErrors } from '..'

type Props = {
  data: Contract
  onChange: Dispatch<SetContractState>
  amountLabel?: string
  errors: ContractErrors
  setErrors: Dispatch<{ address?: string; amount?: string }>
}

const TokenForm: FC<Props> = (props) => {
  const { data, onChange, amountLabel = 'Amount', errors, setErrors } = props
  const { address, amount } = data
  const { secretjs } = useContext(SecretJsContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>()

  const getTokenInfo = async () => {
    setError('')
    setErrors({ address: '' })

    if (!address) {
      setError('Invalid snip-20 contract address')
      return
    }

    try {
      setLoading(true)
      const queryMsg = {
        token_info: {},
      }
      const trimmedAddress = address.trim()
      const response = await secretjs?.queryContractSmart(
        trimmedAddress,
        queryMsg
      )
      const { token_info } = response
      console.log(response)
      if (token_info) {
        setTokenInfo(token_info)
        onChange({ address: trimmedAddress, decimals: token_info.decimals })
      }
    } catch (error) {
      setError('Invalid snip-20 contract address')
      setTokenInfo(undefined)
      onChange({ amount: '', decimals: -1 })
      console.log('Could not fetch token info', error)
    }
    setLoading(false)
  }

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    if (errors.amount) {
      setErrors({ amount: '' })
    }

    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${tokenInfo?.decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      onChange({ amount })
    }
  }

  return (
    <>
      <Field>
        <Label>Snip-20 Contract Address</Label>
        <InputGroup>
          <Input
            value={address}
            onChange={(e) => onChange({ address: e.currentTarget.value })}
            validation={error || errors.address ? 'error' : undefined}
          />
          <StyledButton onClick={getTokenInfo} disabled={loading}>
            {loading ? <Dots /> : 'Get Info'}
          </StyledButton>
        </InputGroup>
        {(error || errors.address) && (
          <StyledMessage validation="error">
            {error || errors.address}
          </StyledMessage>
        )}
      </Field>
      <Separator sm />
      <Field>
        <Label>{amountLabel}</Label>
        <InputGroup>
          <Input
            value={amount}
            onChange={onChangeAmount}
            disabled={!tokenInfo}
            validation={errors.amount ? 'error' : undefined}
          />
          {tokenInfo && <TokenLabel>{tokenInfo.symbol}</TokenLabel>}
        </InputGroup>
        {errors.amount && (
          <StyledMessage validation="error">{errors.amount}</StyledMessage>
        )}
      </Field>
    </>
  )
}

export default memo(TokenForm)
