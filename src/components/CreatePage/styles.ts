import { Alert } from '@zendeskgarden/react-notifications'
import styled from 'styled-components'

const Forms = styled.div`
  column-gap: ${(props) => props.theme.space.xxl};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: ${(props) => props.theme.space.lg};
`

const StyledAlert = styled(Alert)`
  bottom: 70px;
  position: fixed;
  right: 40px;
  width: 500px;
  word-break: break-word;
`

const Wrapper = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  flex-direction: row;
`

export { Forms, StyledAlert, Wrapper }
