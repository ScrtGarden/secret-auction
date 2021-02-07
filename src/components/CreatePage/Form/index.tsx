import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Textarea } from '@zendeskgarden/react-forms'
import { Dots } from '@zendeskgarden/react-loaders'
import { FC, memo, useState } from 'react'

import { SelectTokens } from '../../../../interfaces'
import validate, { Result } from '../../../../utils/validators/createAuction'
import DateTimePicker from '../../Common/DateTimePicker'
import InputTokenSelector from '../../Common/InputTokenSelector'
import { Container } from './styles'
import { TargetTokenData } from '..'

type Props = {
  loading: boolean
  onSubmit: () => Promise<void>
  sellData: TargetTokenData
  setSellData: (value: {}) => void
  bidData: TargetTokenData
  setBidData: (value: {}) => void
  date: Date
  setDate: (value: Date) => void
  description: string
  setDescription: (value: string) => void
  tokens: SelectTokens
  setTokens: (value: {}) => void
  step?: number
}

const Form: FC<Props> = (props) => {
  const {
    loading,
    onSubmit,
    sellData,
    setSellData,
    bidData,
    setBidData,
    date,
    setDate,
    description,
    setDescription,
    tokens,
    setTokens,
    step,
  } = props

  const [errors, setErrors] = useState<Result | undefined>()

  const onCreate = async () => {
    setErrors(undefined)

    const { hasError, ...rest } = validate({
      sell: { ...tokens[sellData.selected], ...sellData },
      bid: { ...tokens[bidData.selected], ...bidData },
      date,
    })

    if (hasError) {
      setErrors(rest)
      return
    }

    await onSubmit()
  }

  return (
    <Container>
      <InputTokenSelector
        priority={2}
        label="I want to sell"
        data={tokens}
        setTokens={(key, data) => setTokens({ [key]: data })}
        value={sellData.amount}
        onChange={(amount) => setSellData({ amount })}
        selected={sellData.selected}
        onSelect={(selected) => setSellData({ selected })}
        errors={errors?.sell}
        disableInput={loading || step === 1}
        disableSelect={loading || step === 1}
      />
      <InputTokenSelector
        priority={1}
        label="Your minimum price"
        data={tokens}
        setTokens={(key, data) => setTokens({ [key]: data })}
        value={bidData.amount}
        onChange={(amount) => setBidData({ amount })}
        selected={bidData.selected}
        onSelect={(selected) => setBidData({ selected })}
        errors={errors?.bid}
        disableInput={loading}
        disableSelect={loading}
      />
      <DateTimePicker
        label="Expected Close"
        selected={date}
        onChange={setDate}
        error={errors?.date}
        disabled={loading}
      />
      <Field>
        <Label>Description (optional)</Label>
        <Textarea
          placeholder="The curves of your tulips rewite history."
          minRows={4}
          maxRows={6}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          disabled={loading}
        />
      </Field>
      <Button isStretched isPrimary onClick={onCreate} disabled={loading}>
        {loading ? <Dots size={20} /> : 'Create'}
      </Button>
    </Container>
  )
}

export default memo(Form)
