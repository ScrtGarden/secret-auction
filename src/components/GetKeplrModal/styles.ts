import {
  Body,
} from '@zendeskgarden/react-modals'
import styled from "styled-components"

import Icon from "../Icons"

const StyledBody = styled(Body)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const StyledIcon = styled(Icon)`
  height: 10rem;
  margin-bottom: ${props => props.theme.space.md};
  width: 10rem;
`

export { StyledIcon, StyledBody }