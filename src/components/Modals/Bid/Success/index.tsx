import { Button } from '@zendeskgarden/react-buttons'
import { FC, memo } from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../../../../../public/lottie/success-tick.json'
import { Separator } from '../../../Common/StyledComponents'
import { Container, StyledLottie, Text, Title } from './styles'

type Props = {
  amount: string
  symbol?: string
  onClick: () => void
}

const Success: FC<Props> = (props) => {
  const { amount, symbol, onClick } = props
  return (
    <Container>
      <StyledLottie loop={false} animationData={lottieJson} play />
      <Title>Congratulation</Title>
      <Text>
        {`Your bid of ${amount} ${symbol} has successfully been placed. Good luck!`}
      </Text>
      <Separator lg />
      <Button isStretched isPrimary onClick={onClick}>
        Close
      </Button>
    </Container>
  )
}

export default memo(Success)
