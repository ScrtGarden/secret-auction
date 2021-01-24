import { ChevronButton } from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu } from '@zendeskgarden/react-dropdowns'
import { FC, memo, useState } from 'react'

import useUpdateEffect from '../../../../../../utils/hooks/useUpdateEffect'
import { StyledButton, StyledSplitButton, StyledTrigger } from './styles'

type Props = {
  options: {
    [key: string]: string
  }
  onClick: (key: string) => void
  disabled?: boolean
}

const MultiButton: FC<Props> = (props) => {
  const { options, onClick, disabled } = props
  const [rotated, setRotated] = useState<boolean>()
  const [selected, setSelected] = useState(Object.keys(options)[0])

  useUpdateEffect(() => {
    setSelected(Object.keys(options)[0])
  }, [options])

  return (
    <StyledSplitButton>
      <StyledButton
        isStretched
        onClick={() => onClick(selected)}
        disabled={disabled}
      >
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
          <ChevronButton isRotated={rotated} disabled={disabled} />
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
