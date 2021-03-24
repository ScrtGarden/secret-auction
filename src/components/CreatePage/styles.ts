import styled from 'styled-components'

import { media } from '../../styles/mediaQueries'

const Grid = styled.div`
  display: grid;
  row-gap: ${(props) => props.theme.space.xxl};

  ${media.tablet} {
    column-gap: ${(props) => props.theme.space.xxl};
    grid-template-columns: repeat(2, 1fr);
  }
`

export { Grid }
