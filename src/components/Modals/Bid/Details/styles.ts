import styled from 'styled-components'

import Icon from '../../../Icons'

type TextProps = {
  readonly nomargin?: boolean
}

const Container = styled.div`
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0 ${(props) => props.theme.space.xs} 0 0;
`

const Description = styled.p`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: ${(props) => props.theme.lineHeights.sm};
  margin: ${(props) => props.theme.space.xxs} 0 0 0;
`

const Token = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.space.sm};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[600]};
  height: 14px;
  width: 14px;
`

const EndAt = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space.md};
`

const StyledClock = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[800]};
  height: 16px;
  margin-right: ${(props) => props.theme.space.xs};
  width: 16px;
`

const EndAtText = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin: 0;
`

export {
  Container,
  Text,
  Token,
  StyledIcon,
  Description,
  EndAtText,
  EndAt,
  StyledClock,
}
