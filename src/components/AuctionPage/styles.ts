import styled from 'styled-components'

import { media } from '../../styles/mediaQueries'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.space.xxl};
  row-gap: ${(props) => props.theme.space.lg};

  ${media.tablet} {
    column-gap: ${(props) => props.theme.space.lg};
    flex-direction: row;
  }
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.lg};
  flex: 1;
`

export { Content, Cards }
