import { Field, Label, MediaInput } from '@zendeskgarden/react-forms'
import { FC, memo } from 'react'

import { FilterToken } from '../../../utils/constants'
import InputWithDropdown from '../Common/InputWithDropdown'
import { Container, StartIcon } from './styles'

type Props = {
  options: FilterToken[]
  sellValue: string
  onChangeSellValue: (value: string) => void
}

const Filters: FC<Props> = (props) => {
  const { options, sellValue, onChangeSellValue } = props

  return (
    <Container>
      <Field>
        <Label>Search</Label>
        <MediaInput start={<StartIcon name="search" />} />
      </Field>
      <InputWithDropdown
        label="Sell"
        options={options}
        value={sellValue}
        onChange={onChangeSellValue}
      />
      <InputWithDropdown label="Bid" options={options} />
    </Container>
  )
}

export default memo(Filters)
