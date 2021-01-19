import { Skeleton } from '@zendeskgarden/react-loaders'
import styled from 'styled-components'

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${(props) => props.theme.space.xxs};

  :last-child {
    margin: 0;
  }
`

const Buttons = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  margin-top: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { StyledSkeleton, Buttons }
