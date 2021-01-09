import { Stepper } from '@zendeskgarden/react-accordions'
import { Spinner } from '@zendeskgarden/react-loaders'
import { PALETTE } from '@zendeskgarden/react-theming'
import { FC, memo } from 'react'

import { Container, StyledStepperLabel, Text, Title } from './styles'

type Props = {
  step: number
}

const ProgressStepper: FC<Props> = (props) => {
  const { step } = props

  return (
    <Container>
      <Stepper activeIndex={step}>
        <Stepper.Step key="step-1">
          <StyledStepperLabel
            icon={step === 0 ? <Spinner color={PALETTE.white} /> : undefined}
          >
            Setting up allowance
          </StyledStepperLabel>
          <Stepper.Content>
            <Text>
              Gives the factory permission to consign your sell tokens on your
              behalf.
            </Text>
          </Stepper.Content>
        </Stepper.Step>
        <Stepper.Step key="step-2">
          <StyledStepperLabel
            icon={step === 1 ? <Spinner color={PALETTE.white} /> : undefined}
          >
            Creating auction
          </StyledStepperLabel>
          <Stepper.Content>
            <Text>One sec, just creating your auction. When? Imminent.</Text>
          </Stepper.Content>
        </Stepper.Step>
        {step === 2 && (
          <>
            <Title>Congratulation!</Title>
            <Text>
              Your sealed bid auction was successfully created on the network.
            </Text>
          </>
        )}
      </Stepper>
    </Container>
  )
}

export default memo(ProgressStepper)
