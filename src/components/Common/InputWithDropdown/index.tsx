import { ChevronButton } from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { Field, Label } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo, useState } from 'react'

import { FilterToken } from '../../../../utils/constants'
import { StyledInput, StyledInputGroup } from './styles'

type Props = {
  label?: string
  options: FilterToken[]
  value: string
  onChange: (value: string) => void
}

const InputWithDropdown: FC<Props> = (props) => {
  const { label, options, value, onChange } = props
  const [rotated, setRotated] = useState<boolean>()

  const onChangeValue = (e: FormEvent<HTMLInputElement>) => {
    const string = e.currentTarget.value
    if (!string || string.match(/^[A-Za-z]{0,6}$/)) {
      onChange(string)
    }
  }

  return (
    <Field>
      <Label>{label}</Label>
      <StyledInputGroup>
        <StyledInput
          placeholder="Symbol"
          value={value}
          onChange={onChangeValue}
        />
        <Dropdown
          selectedItem={options.find((item) => item.label === value)}
          onSelect={(item) => onChange(item.label)}
          downshiftProps={{
            itemToString: (item: FilterToken) => item && item.label,
          }}
          onStateChange={(options) =>
            Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
            setRotated(options.isOpen)
          }
        >
          <Trigger>
            <ChevronButton isRotated={rotated} />
          </Trigger>
          <Menu placement="bottom-end">
            {options.map((option) => (
              <Item key={option.value} value={option}>
                {option.label}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      </StyledInputGroup>
    </Field>
  )
}

export default memo(InputWithDropdown)
