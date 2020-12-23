import { Spinner } from '@zendeskgarden/react-loaders'
import { FC, memo } from 'react'

import { Container, StyledSpinner } from './styles'

const LoadingPage: FC = () => (
  <Container>
    <StyledSpinner size="80" />
  </Container>
)

export default memo(LoadingPage)
