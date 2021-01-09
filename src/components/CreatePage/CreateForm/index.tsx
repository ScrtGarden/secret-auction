import { Button } from '@zendeskgarden/react-buttons'
import { Datepicker } from '@zendeskgarden/react-datepickers'
import { Field, Input, Label, Textarea } from '@zendeskgarden/react-forms'
import { Dots } from '@zendeskgarden/react-loaders'
import { format } from 'date-fns'
import { Dispatch, FC, memo } from 'react'

import { DATE_FORMAT } from '../../../../utils/constants'
import { Separator } from '../../Common/StyledComponents'
import ProgressStepper from '../ProgressStepper'
import TokenForm from '../TokenForm'
import { Container, Header, Wrapper } from './styles'
import { Contract, ContractErrors } from '..'

export type SetContractState = {
  address?: string
  amount?: string
  decimals?: number
}

type Props = {
  sellData: Contract
  bidData: Contract
  onChangeSell: Dispatch<SetContractState>
  onChangeBid: Dispatch<SetContractState>
  description: string
  onChangeDescription: Dispatch<string>
  onSubmit: () => void
  sellContractErrors: ContractErrors
  bidContractErrors: ContractErrors
  setSellContractErrors: Dispatch<{ address?: string; amount?: string }>
  setBidContractErrors: Dispatch<{ address?: string; amount?: string }>
  loading: boolean
  date: Date
  setDate: Dispatch<Date>
}

const CreateForm: FC<Props> = (props) => {
  const {
    sellData,
    bidData,
    onChangeSell,
    onChangeBid,
    description,
    onChangeDescription,
    onSubmit,
    sellContractErrors,
    bidContractErrors,
    setSellContractErrors,
    setBidContractErrors,
    loading,
    date,
    setDate,
  } = props
  return (
    <Container>
      <Wrapper>
        <Header>Trade</Header>
        <TokenForm
          data={sellData}
          onChange={onChangeSell}
          errors={sellContractErrors}
          setErrors={setSellContractErrors}
        />
      </Wrapper>
      <Wrapper>
        <Header>In Exchange For</Header>
        <TokenForm
          data={bidData}
          onChange={onChangeBid}
          amountLabel="Minimum Bid"
          errors={bidContractErrors}
          setErrors={setBidContractErrors}
        />
      </Wrapper>
      <Wrapper>
        <Header>Extra Details</Header>
        <Field>
          <Label>End Date</Label>
          <Datepicker
            value={date}
            onChange={(date) => setDate(date)}
            minValue={new Date()}
            formatDate={(date) => format(date, DATE_FORMAT)}
          >
            <Input />
          </Datepicker>
        </Field>
        <Separator sm />
        <Field>
          <Label>Description (optional)</Label>
          <Textarea
            minRows={4}
            maxRows={6}
            value={description}
            onChange={(e) => onChangeDescription(e.currentTarget.value)}
          />
        </Field>
        <Separator lg />
        <Button isStretched isPrimary onClick={onSubmit} disabled={loading}>
          {loading ? <Dots size={20} /> : 'Create'}
        </Button>
      </Wrapper>
    </Container>
  )
}

export default memo(CreateForm)
