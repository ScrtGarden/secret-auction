import { Stepper } from '@zendeskgarden/react-accordions'
import styled from 'styled-components'

interface TextProps {
  readonly marginbottom?: boolean
}

const Container = styled.div``

const StyledStepperLabel = styled(Stepper.Label)`
  font-size: ${(props) => props.theme.fontSizes.md};
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space.xl} auto 0 auto;
  max-width: 400px;
`

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: ${(props) => props.theme.lineHeights.md};
  margin: 0;
  ${(props) => props.marginbottom && `margin-bottom: ${props.theme.space.sm}`};
`

const Title = styled.h2`
  color: ${(props) => props.theme.palette.grey[800]};
  margin: 0 0 ${(props) => props.theme.space.xs} 0;
`

export { Container, Content, Text, Title, StyledStepperLabel }
