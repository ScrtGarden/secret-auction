import { Button } from '@zendeskgarden/react-buttons'
import { FC, memo } from 'react'

import { Separator } from '../../../Common/StyledComponents'
import { Container, Text, Title } from './styles'

type Props = {
  amount: string
  symbol?: string
  onClick: () => void
}

const Success: FC<Props> = (props) => {
  const { amount, symbol, onClick } = props
  return (
    <Container>
      <Title>Congratulation</Title>
      <Text>
        {`Your bid of ${amount} ${symbol} has successfully been placed. Good luck!`}
      </Text>
      <Separator md />
      <Button isStretched isPrimary onClick={onClick}>
        Close
      </Button>
    </Container>
  )
}

export default memo(Success)
