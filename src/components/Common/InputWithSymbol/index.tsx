import { Field, Input, InputGroup, Label } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo } from 'react'

import { StyledMessage } from '../StyledComponents'
import { TokenLabel } from './styles'

type Props = {
  label: string
  symbol: string | undefined
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
}

const InputWithSymbol: FC<Props> = (props) => {
  const { label, symbol, value, disabled, error, onChange } = props
  return (
    <Field>
      <Label>{label}</Label>
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
