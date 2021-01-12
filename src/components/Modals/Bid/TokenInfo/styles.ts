import { Anchor } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  color: ${(props) => props.theme.palette.white};

  :hover {
    color: ${(props) => props.theme.palette.grey[400]};
  }
`

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.space.xxs};
`

const Text = styled.p`
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin: 0;
`

export { Text, StyledAnchor, Wrapper }
