import { Field, Input, Label, Message } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo } from 'react'

import { FieldGrid } from '../../Common/StyledComponents'
import {
  Container,
  Fields,
  Header,
  InnerContainer,
  Separator,
  SubText,
  Title,
} from './styles'
import { Contract, ContractErrors } from '..'

type Props = {
  data: Contract
  title: string
  onChange: Function
  errors: ContractErrors
  amountLabel?: string
  onBlur: (key: string) => void
  isConnected: boolean
}

const TokenForm: FC<Props> = (props) => {
  const {
    data,
    errors,
    onChange,
    title,
    amountLabel = 'Amount',
    onBlur,
    isConnected,
  } = props
  const { amount, address, codeHash } = data

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value

    if (!amount || amount.match(/^\d{1,}(\.\d{0,})?$/)) {
      onChange({ amount })
    }
  }

  return (
    <Container>
      <InnerContainer>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Fields>
          <Field>
            <Label>{amountLabel}</Label>
            <Input
              placeholder="0"
              value={amount}
              onChange={onChangeAmount}
              validation={errors.amount ? 'error' : undefined}
              onBlur={() => onBlur('amount')}
              disabled={!isConnected}
            />
            {errors.amount && (
              <Message validation="error">{errors.amount}</Message>
            )}
          </Field>
          <Separator />
          <FieldGrid>
            <SubText>Snip-20 token details</SubText>
            <Field>
              <Label>Address</Label>
              <Input
                value={address}
                onChange={(e) => onChange({ address: e.target.value })}
                validation={errors.address ? 'error' : undefined}
                onBlur={() => onBlur('address')}
                disabled={!isConnected}
              />
              {errors.address && (
                <Message validation="error">{errors.address}</Message>
              )}
            </Field>
            <Field>
              <Label>Code hash</Label>
              <Input
                value={codeHash}
                onChange={(e) => onChange({ codeHash: e.target.value })}
                validation={errors.codeHash ? 'error' : undefined}
                onBlur={() => onBlur('codeHash')}
                disabled={!isConnected}
              />
              {errors.codeHash && (
                <Message validation="error">{errors.codeHash}</Message>
              )}
            </Field>
          </FieldGrid>
        </Fields>
      </InnerContainer>
    </Container>
  )
}

export default memo(TokenForm)
