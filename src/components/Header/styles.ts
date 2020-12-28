import { Avatar } from '@zendeskgarden/react-avatars'
import { Button } from '@zendeskgarden/react-buttons'
import {
  Body,
  Chrome,
  HeaderItem,
  HeaderItemText,
} from '@zendeskgarden/react-chrome'
import styled from 'styled-components'

import { RouteAndColor } from '../../../utils/constants'
import Icon from '../Icons'

const StyledChrome = styled(Chrome)`
  height: 82px;
`

const StyledBody = styled(Body)<{ background: RouteAndColor }>`
  background: ${(props) =>
    props.theme.palette[props.background.color][props.background.strength]};
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space.md};
`

const MainIcon = styled(Icon)`
  height: 3rem;
  fill: ${(props) => props.theme.palette.green[600]};
  width: 3rem;
`

const StyledHeaderItemText = styled(HeaderItemText)<{ selected: boolean }>`
  color: ${(props) => props.theme.palette.grey[props.selected ? 800 : 600]};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`

const StyledButton = styled(Button)`
  width: 64px;
`

const StyledHeaderItem = styled(HeaderItem)`
  cursor: pointer;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.white};
  height: 0.5rem;
  width: 0.5rem;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

export {
  Container,
  MainIcon,
  StyledButton,
  StyledHeaderItem,
  StyledChrome,
  StyledBody,
  StyledHeaderItemText,
  StyledIcon,
  StyledAvatar,
}
