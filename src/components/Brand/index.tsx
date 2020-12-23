import { FC, memo } from 'react'

import { Brandmark, Container, StyledIcon } from './styles'

const Brand: FC = () => {
  return (
    <Container>
      <StyledIcon name="farming" />
      <Brandmark>Secret Garden</Brandmark>
    </Container>
  )
}

export default memo(Brand)
