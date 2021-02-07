import { Button, ToggleButton } from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { Checkbox, Field, Label, MediaInput } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo, useState } from 'react'

import { FilterToken } from '../../../../utils/constants'
import InputWithDropdown from '../../Common/InputWithDropdown'
import { ICheckboxes, initCheckboxes } from '../../ProfilePage'
import { Container } from './styles'

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

  return (
    <Container>
      <Field>
        <Checkbox
          checked={seller}
          onChange={() => onChangeCheckbox({ seller: !seller })}
        >
          <Label>Owner</Label>
        </Checkbox>
      </Field>
      <Field>
        <Checkbox
          checked={bidder}
          onChange={() => onChangeCheckbox({ bidder: !bidder })}
        >
          <Label>Bidder</Label>
        </Checkbox>
      </Field>
      <Field>
        <Checkbox
          checked={open}
          onChange={() => onChangeCheckbox({ open: !open })}
        >
          <Label>Open</Label>
        </Checkbox>
      </Field>
      <Field>
        <Checkbox
          checked={closed}
          onChange={() => onChangeCheckbox({ closed: !closed })}
        >
          <Label>Closed</Label>
        </Checkbox>
      </Field>
      <Field>
        <Checkbox
          checked={won}
          onChange={() => onChangeCheckbox({ won: !won })}
        >
          <Label>Won</Label>
        </Checkbox>
      </Field>
      <Button
        isBasic
        size="small"
        onClick={() => onChangeCheckbox(initCheckboxes)}
      >
        Clear
      </Button>
      <div />
      <InputWithDropdown
        placeholder="Sell"
        options={options}
        value={sellValue}
        onChange={onChangeSellValue}
      />
      <InputWithDropdown
        placeholder="Bid"
        options={options}
        value={bidValue}
        onChange={onChangeBidValue}
      />
    </Container>
  )
}

export default memo(Filters)
