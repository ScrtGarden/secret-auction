import { Field, Hint, Label, Radio } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo } from 'react'

import DateTimePicker from '../../../Common/DateTimePicker'
import InputWithSymbol from '../../../Common/InputWithSymbol'
import { Separator } from '../../../Common/StyledComponents'

type Props = {
  radioValue: string
  onChange: (value: string) => void
  date: Date
  onChangeDate: (value: Date) => void
  amount: string
  onChangeAmount: (value: string) => void
  decimals?: number
  symbol?: string
}

const NoActiveBids: FC<Props> = (props) => {
  const {
    radioValue,
    onChange,
    date,
    onChangeDate,
    amount,
    onChangeAmount,
    decimals,
    symbol,
  } = props

  const handleAmount = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      onChangeAmount(amount)
    }
  }

  return (
    <>
      <Field>
        <Radio
          value="finalize"
          checked={radioValue === 'finalize'}
          onChange={(event) => onChange(event.target.value)}
        >
          <Label>Finalize</Label>
          <Hint>Closes and finalizes the auction.</Hint>
        </Radio>
      </Field>
      <Separator sm />
      <Field>
        <Radio
          value="extend"
          checked={radioValue === 'extend'}
          onChange={(event) => onChange(event.target.value)}
        >
          <Label>Extend</Label>
          <Hint>
            Keep the auction open, with a new end date and minimum bid
            (optional).
          </Hint>
        </Radio>
      </Field>
      {radioValue === 'extend' && (
        <>
          <Separator lg />
          <DateTimePicker
            label="New End Date"
            selected={date}
            onChange={(date) => onChangeDate(date)}
          />
          <Separator sm />
          <InputWithSymbol
            label="New Amount"
            value={amount}
            onChange={handleAmount}
            symbol={symbol}
          />
        </>
      )}
    </>
  )
}

export default memo(NoActiveBids)
