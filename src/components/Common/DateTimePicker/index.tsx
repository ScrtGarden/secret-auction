import { Input, Label, Message } from '@zendeskgarden/react-forms'
import { FC, memo } from 'react'
import DatePicker from 'react-datepicker'

import { Container } from './styles'

type Props = {
  selected: Date
  onChange: (date: Date) => void
  label?: string
  error?: string
  disabled?: boolean
}

const DateTimePicker: FC<Props> = (props) => {
  const { selected, onChange, label, error, disabled } = props

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <DatePicker
        placeholderText="2021/01/30 12:00 AM"
        selected={selected}
        onChange={onChange}
        minDate={new Date()}
        customInput={<Input validation={error ? 'error' : undefined} />}
        dateFormat="yyyy/MM/dd hh:mm a"
        showTimeInput
        showTimeSelect
        disabled={disabled}
      />
      {error && (
        <Message validation={error ? 'error' : undefined}>{error}</Message>
      )}
    </Container>
  )
}

export default memo(DateTimePicker)
