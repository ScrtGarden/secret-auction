import { Button } from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { Field, Label, MediaInput } from '@zendeskgarden/react-forms'
import { FC, FormEvent, memo, useState } from 'react'

import { Container, DropdownEndIcon, StartIcon } from './styles'

type Filters = {
  [key: string]: string
}

const FILTERS: Filters = {
  all: 'All',
  active: 'Active',
  closed: 'Closed',
}

const FILTER_ARRAY = Object.entries(FILTERS).map(([key, value]) => ({
  label: value,
  value: key,
}))

type Props = {
  search: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  filter: string
  onSelect: (value: string) => void
}

const Filters: FC<Props> = (props) => {
  const { search, onChange, filter, onSelect } = props
  const [rotated, setRotated] = useState<boolean | undefined>()

  return (
    <Container>
      <Field>
        <Label>Search</Label>
        <MediaInput
          start={<StartIcon name="search" />}
          value={search}
          onChange={onChange}
        />
      </Field>
      {/* <Dropdown
        onSelect={onSelect}
        onStateChange={(options) =>
          Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
          setRotated(options.isOpen)
        }
      >
        <Trigger>
          <Button>
            {FILTERS[filter]}
            <Button.EndIcon isRotated={rotated}>
              <DropdownEndIcon name="chevron-down" />
            </Button.EndIcon>
          </Button>
        </Trigger>
        <Menu>
          {FILTER_ARRAY.map((item) => (
            <Item key={item.value} value={item.value}>
              {item.label}
            </Item>
          ))}
        </Menu>
      </Dropdown> */}
    </Container>
  )
}

export default memo(Filters)
