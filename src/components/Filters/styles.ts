import styled from 'styled-components'

import Icon from '../Icons'

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-template-columns: 50px 120px 110px 1fr 150px 150px;
  align-items: center;
`

const StartIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[500]};
`

export { Container, StartIcon }
