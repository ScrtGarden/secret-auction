import {
  Button,
  ChevronButton,
  SplitButton,
} from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { FC, memo, useState } from 'react'

import { StyledButton, StyledSplitButton, StyledTrigger } from './styles'

type Props = {
  options: {
    [key: string]: string
  }
  onClick: (key: string) => void
}

const MultiButton: FC<Props> = (props) => {
  const { options, onClick } = props
  const [rotated, setRotated] = useState<boolean>()
  const [selected, setSelected] = useState(Object.keys(options)[0])

  return (
    <StyledSplitButton>
      <StyledButton isStretched onClick={() => onClick(selected)}>
        {options[selected]}
      </StyledButton>
      <Dropdown
        onStateChange={(options) =>
          Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
          setRotated(options.isOpen)
        }
        onSelect={(value) => setSelected(value)}
      >
        <StyledTrigger>
          <ChevronButton isRotated={rotated} />
        </StyledTrigger>
        <Menu placement="bottom-end">
          {Object.entries(options).map(([key, value]) => (
            <Item key={key} value={key}>
              {value}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </StyledSplitButton>
  )
}

export default memo(MultiButton)
