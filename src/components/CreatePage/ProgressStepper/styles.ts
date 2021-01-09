import { Stepper } from '@zendeskgarden/react-accordions'
import styled from 'styled-components'

const Container = styled.div`
  /* max-width: 600px; */
`

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

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;
`

const Title = styled.h2`
  color: ${(props) => props.theme.palette.grey[800]};
  margin: 0 0 ${(props) => props.theme.space.xs} 0;
`

export { Container, Content, Text, Title, StyledStepperLabel }
