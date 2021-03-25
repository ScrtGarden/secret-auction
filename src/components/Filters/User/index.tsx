import { Button } from '@zendeskgarden/react-buttons'
import { Checkbox, Field, Label } from '@zendeskgarden/react-forms'
import { FC, memo } from 'react'

import { FilterToken } from '../../../../utils/constants'
import { ICheckboxes, initCheckboxes } from '../../ProfilePage'
import { StyledInputWithDropdown } from '../styles'
import { Container, Wrapper } from './styles'

type Props = {
  selectedCheckboxes: ICheckboxes
  onChangeCheckbox: (value: ICheckboxes) => void
  options: FilterToken[]
  sellValue: string
  onChangeSellValue: (value: string) => void
  bidValue: string
  onChangeBidValue: (value: string) => void
}

const Filters: FC<Props> = (props) => {
  const {
    selectedCheckboxes,
    onChangeCheckbox,
    options,
    sellValue,
    onChangeSellValue,
    bidValue,
    onChangeBidValue,
  } = props
  const { seller, bidder, open, closed, won } = selectedCheckboxes

  const DATA = [
    { label: 'Owner', key: 'seller', value: seller },
    { label: 'Bidder', key: 'bidder', value: bidder },
    { label: 'Open', key: 'open', value: open },
    { label: 'Closed', key: 'closed', value: closed },
    { label: 'Won', key: 'won', value: won },
  ]

  return (
    <Container>
      <Wrapper>
        {DATA.map((item) => (
          <Field key={item.key}>
            <Checkbox
              checked={item.value}
              onChange={() => onChangeCheckbox({ [item.key]: !item.value })}
            >
              <Label>{item.label}</Label>
            </Checkbox>
          </Field>
        ))}
        <Button
          isBasic
          size="small"
          onClick={() => onChangeCheckbox(initCheckboxes)}
        >
          Clear
        </Button>
      </Wrapper>
      <Wrapper>
        <StyledInputWithDropdown
          placeholder="Sell"
          options={options}
          value={sellValue}
          onChange={onChangeSellValue}
        />
        <StyledInputWithDropdown
          placeholder="Bid"
          options={options}
          value={bidValue}
          onChange={onChangeBidValue}
        />
      </Wrapper>
    </Container>
  )
}

export default memo(Filters)
