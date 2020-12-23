import { Button } from '@zendeskgarden/react-buttons'
import {
  HeaderItemText,
} from '@zendeskgarden/react-chrome'
import styled from "styled-components"

import Icon from "../Icons"

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.theme.space.md};
`

const MainIcon = styled(Icon)`
  height: 3rem;
  fill: ${props => props.theme.palette.green[600]};
  width: 3rem;
`

const Address = styled(HeaderItemText)`
  color: ${props => props.theme.palette.green[700]};
  font-weight: ${props => props.theme.fontWeights.bold};
`

const StyledButton = styled(Button)`
  width: 64px;
`

export { Container, MainIcon, Address, StyledButton }