import {
  Button,
  ChevronButton,
  SplitButton,
} from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { memo, useState } from 'react'

import { StyledButton, StyledSplitButton, StyledTrigger } from './styles'

const MultiButton = () => {
  const [rotated, setRotated] = useState<boolean>()

  return (
    <StyledSplitButton>
      <StyledButton>Bid</StyledButton>
      <Dropdown
        onStateChange={(options) =>
          Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
          setRotated(options.isOpen)
        }
      >
        <StyledTrigger>
          <ChevronButton isRotated={rotated} />
        </StyledTrigger>
        <Menu placement="bottom-end">
          <Item value="prune">Prune</Item>
          <Item value="water">Water</Item>
          <Item value="fertilize">Fertilize</Item>
        </Menu>
      </Dropdown>
    </StyledSplitButton>
  )
}

export default memo(MultiButton)
