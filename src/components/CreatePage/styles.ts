import { Alert } from '@zendeskgarden/react-notifications'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
  bottom: 70px;
  position: fixed;
  right: 40px;
  width: 500px;
  word-break: break-word;
`

const Grid = styled.div`
  column-gap: ${(props) => props.theme.space.xl};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export { StyledAlert, Grid }
