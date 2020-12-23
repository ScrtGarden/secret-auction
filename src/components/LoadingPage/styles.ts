import { Spinner } from '@zendeskgarden/react-loaders'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

const StyledSpinner = styled(Spinner)`
  color: ${props => props.theme.palette.green[700]};
`

export { Container, StyledSpinner }