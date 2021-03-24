import { ChevronButton } from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { Label } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo, useState } from 'react'

import { FilterToken } from '../../../../utils/constants'
import { StyledField, StyledInput, StyledInputGroup } from './styles'

type Props = {
  label?: string
  placeholder?: string
  options: FilterToken[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const InputWithDropdown: FC<Props> = (props) => {
  const { label, placeholder, options, value, onChange, className } = props
  const [rotated, setRotated] = useState<boolean>()

  const onChangeValue = (e: FormEvent<HTMLInputElement>) => {
    const string = e.currentTarget.value
    if (!string || string.match(/^[A-Za-z]{0,6}$/)) {
      onChange(string)
    }
  }

  return (
    <StyledField className={className}>
      {label && <Label>{label}</Label>}
      <StyledInputGroup>
        <StyledInput
          isCompact
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
          onClick={(e) => e.currentTarget.select()}
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
            <ChevronButton isRotated={rotated} size="small" />
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
    </StyledField>
  )
}

export default memo(InputWithDropdown)
