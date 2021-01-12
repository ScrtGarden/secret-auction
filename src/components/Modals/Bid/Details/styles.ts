import styled from 'styled-components'

import Icon from '../../../Icons'

type TextProps = {
  readonly nomargin?: boolean
}

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0 ${(props) => props.theme.space.xs} 0 0;
`

const Description = styled.p`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.sm};
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

export { Text, Token, StyledIcon, Description }
