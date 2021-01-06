import { Stepper } from '@zendeskgarden/react-accordions'
import { FC, memo } from 'react'

type Props = {
  step: number
}

const ProgressStepper: FC<Props> = (props) => {
  const { step } = props

  return (
    <Stepper activeIndex={step} isHorizontal>
      <Stepper.Step key="step-1">
        <Stepper.Label>Setting up allowance</Stepper.Label>
        <Stepper.Content>
          Your garden&apos;s success depends on its location, so choose a spot
          that has healthy soil, gets good light, and is easily watered.
        </Stepper.Content>
      </Stepper.Step>
      <Stepper.Step key="step-2">
        <Stepper.Label>Creating auction</Stepper.Label>
        <Stepper.Content>
          The layout of your garden depends on its purpose. If you&apos;re
          planting flowers, consider aesthetics like color and layout. If
          you&apos;re growing food, think about harvest times and the kinds of
          pests that might be attracted to your crops.
        </Stepper.Content>
      </Stepper.Step>
      <Stepper.Step key="step-3">
        <Stepper.Label>Finished</Stepper.Label>
        <Stepper.Content>
          Buy clean, hearty, disease-free seeds. Most seed from reliable seed
          companies will meet these specifications.
        </Stepper.Content>
      </Stepper.Step>
    </Stepper>
  )
}

export default memo(ProgressStepper)
