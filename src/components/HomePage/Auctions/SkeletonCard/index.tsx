import { Skeleton } from '@zendeskgarden/react-loaders'
import { memo } from 'react'

import { Label } from '../Card/styles'
import { Container, Details, Wrapper } from './styles'

const SkeletonCard = () => {
  return (
    <Container>
      <Skeleton width="50%" height="25px" />
      <Details>
        <Wrapper>
          <Skeleton width="30%" height="13px" />
        </Wrapper>
        <Wrapper>
          <Skeleton width="30%" height="13px" />
        </Wrapper>
      </Details>
      <Skeleton width="70%" height="13px" />
    </Container>
  )
}

export default memo(SkeletonCard)
