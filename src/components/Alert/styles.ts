import { animated } from 'react-spring'
import styled from 'styled-components'

const Animate = styled(animated.div)`
  position: fixed;
  right: ${(props) => props.theme.space.lg};
  top: ${(props) => props.theme.space.md};
  width: 400px;
  z-index: 401;
`

export { Animate }
