import { Field, Input, InputGroup, Label } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo } from 'react'

import Balance from '../Balance'
import { StyledMessage } from '../StyledComponents'
import { TokenLabel, Wrapper } from './styles'

type Props = {
  label: string
  symbol: string | undefined
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  showBalance?: boolean
  tokenAddress?: string
  decimals?: number
}

const InputWithSymbol: FC<Props> = (props) => {
  const {
    label,
    symbol,
    value,
    disabled,
    error,
    onChange,
    showBalance,
    tokenAddress,
    decimals,
  } = props

  return (
    <Field>
      <Wrapper>
        <Label>{label}</Label>
        {showBalance && (
          <Balance
            tokenAddress={tokenAddress}
            symbol={symbol}
            decimals={decimals}
          />
        )}
      </Wrapper>
      <InputGroup>
        <Input
          value={value}
          onChange={onChange}
          validation={error ? 'error' : undefined}
          disabled={disabled}
        />
        {symbol && <TokenLabel>{symbol}</TokenLabel>}
      </InputGroup>
      {error && <StyledMessage validation="error">{error}</StyledMessage>}
    </Field>
  )
}

export default memo(InputWithSymbol)
