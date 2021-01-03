import {
  Button,
  ChevronButton,
  SplitButton,
} from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import { memo, useState } from 'react'

const MultiActionButton = () => {
  const [rotated, setRotated] = useState<boolean>()
  const [selectedAction, setSelectedAction] = useState()

  return (
    <SplitButton>
      <Button size="small" isPrimary>
        Harvest
      </Button>
      <Dropdown
        onStateChange={(options) =>
          Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
          setRotated(options.isOpen)
        }
      >
        <Trigger>
          <ChevronButton
            isPrimary
            size="small"
            aria-label="other actions"
            isRotated={rotated}
          />
        </Trigger>
        <Menu placement="bottom-end">
          <Item value="prune">Prune</Item>
          <Item value="water">Water</Item>
          <Item value="fertilize">Fertilize</Item>
        </Menu>
      </Dropdown>
    </SplitButton>
  )
}

export default memo(MultiActionButton)
