import { Button } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

import Icon from '../../Icons'

const PADDING_TOP = 20
const PADDING_BOTTOM = PADDING_TOP + 50

const Container = styled.div`
  /* background-color: ${(props) => props.theme.palette.blue[200]}; */
  background-color: #ede0cf;
  padding-bottom: ${`${PADDING_BOTTOM}px`};
  padding-top: ${`${PADDING_TOP}px`};
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Wrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Heading = styled.h1`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.xxxxl};
  margin: 0 0 ${(props) => props.theme.space.md} 0;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  margin: 0 0 ${(props) => props.theme.space.md} 0;
  width: 70%;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.white};
`

const StyledButton = styled(Button)`
  width: 180px;
`

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const Image = styled(Icon)`
  height: 400px;
  width: 100%;
`

export {
  Container,
  Content,
  Wrapper,
  Heading,
  Text,
  StyledIcon,
  StyledButton,
  Image,
  ImageWrapper,
}
