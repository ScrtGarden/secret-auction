import { Alert } from '@zendeskgarden/react-notifications'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
  position: fixed;
  right: ${(props) => props.theme.space.lg};
  top: ${(props) => props.theme.space.md};
  width: 400px;
  z-index: 401;
`

export { StyledAlert }
