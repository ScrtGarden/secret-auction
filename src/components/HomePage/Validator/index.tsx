import { memo } from 'react'

import { InnerContainer } from '../../Common/StyledComponents'
import { Container } from './styles'

const Validator = () => {
  return (
    <Container>
      <InnerContainer></InnerContainer>
    </Container>
  )
}

export default memo(Validator)
