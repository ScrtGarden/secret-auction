import Lottie from 'react-lottie-player'
import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const Title = styled.h1`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0 0 ${(props) => props.theme.space.md};
  text-align: center;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: ${(props) => props.theme.lineHeights.md};
  margin: 0;
`

const StyledLottie = styled(Lottie)`
  height: 150px;
  margin: 0 auto;
  width: 150px;
`

export { Container, Title, Text, StyledLottie }
