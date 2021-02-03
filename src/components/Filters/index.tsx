import { Field, Label, MediaInput } from '@zendeskgarden/react-forms'
import { FC, memo } from 'react'

import { FilterToken } from '../../../utils/constants'
import InputWithDropdown from '../Common/InputWithDropdown'
import { Container, StartIcon } from './styles'

type Props = {
  searchValue: string
  onChangeSearchValue: (value: string) => void
  options: FilterToken[]
  sellValue: string
  onChangeSellValue: (value: string) => void
  bidValue: string
  onChangeBidValue: (value: string) => void
}

const Filters: FC<Props> = (props) => {
  const {
    searchValue,
    onChangeSearchValue,
    options,
    sellValue,
    onChangeSellValue,
    bidValue,
    onChangeBidValue,
  } = props

  return (
    <Container>
      <Field>
        <Label>Search</Label>
        <MediaInput
          start={<StartIcon name="search" />}
          value={searchValue}
          onChange={(e) => onChangeSearchValue(e.currentTarget.value)}
        />
      </Field>
      <InputWithDropdown
        label="Sell"
        options={options}
        value={sellValue}
        onChange={onChangeSellValue}
      />
      <InputWithDropdown
        label="Bid"
        options={options}
        value={bidValue}
        onChange={onChangeBidValue}
      />
    </Container>
  )
}

export default memo(Filters)
