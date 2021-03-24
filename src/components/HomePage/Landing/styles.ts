import { Button } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'
import Icon from '../../Icons'

const PADDING_TOP = 20
const PADDING_BOTTOM = PADDING_TOP + 50

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.blue[200]};
  padding-bottom: ${`${PADDING_BOTTOM}px`};
  padding-top: ${`${PADDING_TOP}px`};
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Heading = styled.h1`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0 0 ${(props) => props.theme.space.md} 0;
  text-align: center;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.xxxl};
  }
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: ${(props) => props.theme.lineHeights.md};
  margin: 0 0 ${(props) => props.theme.space.md} 0;
  text-align: center;
  max-width: 400px;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.white};
`

const StyledButton = styled(Button)`
  width: 180px;
`

export { Container, Content, Heading, Text, StyledIcon, StyledButton }
