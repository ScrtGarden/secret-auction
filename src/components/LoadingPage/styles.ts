import { Spinner } from '@zendeskgarden/react-loaders'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const StyledSpinner = styled(Spinner)`
  color: ${(props) => props.theme.palette.green[700]};
  margin-bottom: ${(props) => props.theme.space.lg};
`

export { Container, StyledSpinner }
