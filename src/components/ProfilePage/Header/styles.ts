import { Button } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'
import Icon from '../../Icons'

type ButtonProps = {
  readonly length?: 'short' | 'regular' | 'long'
}

type IconProps = {
  readonly active?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.space.xxl};
  row-gap: ${(props) => props.theme.space.md};

  ${media.tablet} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`

const StyledIcon = styled(Icon)<IconProps>`
  fill: ${(props) =>
    props.active
      ? props.theme.palette.kale[600]
      : props.theme.palette.grey[500]};
  height: 25px;
  width: 25px;

  ${media.tablet} {
    height: 40px;
    width: 40px;
  }
`

const Circle = styled.div`
  align-items: center;
  display: flex;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.grey[300]};
  height: 50px;
  justify-content: center;
  margin-right: ${(props) => props.theme.space.md};
  width: 50px;

  ${media.tablet} {
    height: 80px;
    width: 80px;
  }
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Address = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0 0 ${(props) => props.theme.space.xs} 0;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.xl};
  }
`

const StyledButton = styled(Button)<ButtonProps>`
  ${(props) => props.length === 'short' && 'width: 86px'};
  ${(props) => props.length === 'regular' && 'width: 114px'};
  ${(props) => props.length === 'long' && 'width: 134px'};
`

const CopyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Dot = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  margin: 0 ${(props) => props.theme.space.xs};
`

const Buttons = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
`

export {
  Container,
  Circle,
  Address,
  Wrapper,
  StyledButton,
  CopyWrapper,
  Dot,
  Buttons,
  StyledIcon,
}
