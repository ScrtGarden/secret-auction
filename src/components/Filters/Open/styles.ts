import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'

const Container = styled.div`
  align-items: center;
  display: grid;
  row-gap: ${(props) => props.theme.space.md};

  ${media.tablet} {
    column-gap: ${(props) => props.theme.space.md};
    grid-template-columns: 50px 120px 110px 1fr 150px 150px;
  }
`

export { Container }
