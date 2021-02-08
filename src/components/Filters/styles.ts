import { ToggleButton } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

interface StyledToggleButtonProps {
  readonly isPressed: boolean
}

const StyledToggleButton = styled(ToggleButton)<StyledToggleButtonProps>`
  ${(props) =>
    !props.isPressed &&
    `
    color: ${props.theme.palette.grey[600]};
    border-color: ${props.theme.palette.grey[300]}
  `}
`

export { StyledToggleButton }
