import { Avatar } from '@zendeskgarden/react-avatars'
import { Button } from '@zendeskgarden/react-buttons'
import {
  Body,
  Chrome,
  Header,
  HeaderItem,
  HeaderItemText,
} from '@zendeskgarden/react-chrome'
import styled from 'styled-components'

import { RouteAndColor } from '../../../utils/constants'
import Icon from '../Icons'

type HeaderItemProps = {
  readonly hasLogo?: boolean
}

type NavButtonProps = {
  readonly active?: boolean
}

const StyledChrome = styled(Chrome)`
  && {
    height: 120px;
  }
`

const StyledBody = styled(Body)<{ background: RouteAndColor }>`
  background: ${(props) =>
    props.theme.palette[props.background.color][props.background.strength]};
`

const StyledHeaderItemText = styled(HeaderItemText)<{ selected: boolean }>`
  color: ${(props) => props.theme.palette.grey[props.selected ? 800 : 600]};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`

const StyledButton = styled(Button)`
  width: 64px;
`

const StyledHeaderItem = styled(HeaderItem)<HeaderItemProps>`
  cursor: pointer;
  ${(props) => props.hasLogo && `width: 125px; border-right: none;`}
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.white};
  height: 0.5rem;
  width: 0.5rem;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

const StyledHeader = styled(Header)`
  height: 70px;
`

const NavButton = styled.a<NavButtonProps>`
  ${(props) => props.active && 'background-color: #2f39411a'};
  border-radius: ${(props) => props.theme.borderRadii.md};
  color: ${(props) => props.theme.palette.grey[800]};
  cursor: pointer;
  margin-left: ${(props) => props.theme.space.sm};
  padding: ${(props) => props.theme.space.xs};
  text-decoration: none;

  :hover {
    background-color: #2f39410d;
  }

  :active {
    background-color: #2f394133;
  }
`

export {
  StyledButton,
  StyledHeaderItem,
  StyledChrome,
  StyledBody,
  StyledHeaderItemText,
  StyledIcon,
  StyledAvatar,
  StyledHeader,
  NavButton,
}
