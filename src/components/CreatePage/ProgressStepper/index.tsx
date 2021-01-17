import { Stepper } from '@zendeskgarden/react-accordions'
import { Button } from '@zendeskgarden/react-buttons'
import { Anchor } from '@zendeskgarden/react-buttons'
import { Spinner } from '@zendeskgarden/react-loaders'
import { PALETTE } from '@zendeskgarden/react-theming'
import { FC, memo } from 'react'

import { CHAIN_EXPLORER } from '../../../../utils/constants'
import {
  Container,
  StyledCode,
  StyledStepperLabel,
  Text,
  Title,
} from './styles'

type Props = {
  step: number
  loading: boolean
  onClick: () => void
  txInfo: {
    address: string
    txHash: string
  }
}

const ProgressStepper: FC<Props> = (props) => {
  const { step, loading, onClick, txInfo } = props

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
            icon={
              step === 1 && loading ? (
                <Spinner color={PALETTE.white} />
              ) : undefined
            }
          >
            Creating auction
          </StyledStepperLabel>
          <Stepper.Content>
            <Text marginbottom>
              One sec, just creating your auction. When? Imminent.
            </Text>
            {step === 1 && !loading && (
              <Button size="small" onClick={onClick}>
                Try Again
              </Button>
            )}
          </Stepper.Content>
        </Stepper.Step>
        {step === 2 && (
          <>
            <Title>Congratulation!</Title>
            <Text marginbottom>
              Your sealed bid auction was successfully created on the network.
              It can be found{' '}
              <Anchor
                isExternal
                href={`${CHAIN_EXPLORER}/contracts/${txInfo.address}`}
                target="_blank"
              >
                here
              </Anchor>
            </Text>
            <Text>Your transaction hash:</Text>
            <StyledCode hue="green" size="medium">
              {txInfo.txHash}
            </StyledCode>
          </>
        )}
      </Stepper>
    </Container>
  )
}

export default memo(ProgressStepper)
