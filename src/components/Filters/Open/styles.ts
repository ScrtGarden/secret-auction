import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'

interface WrapperProps {
  readonly inputs?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};

  ${media.tablet} {
    column-gap: ${(props) => props.theme.space.md};
    flex-direction: row;
    justify-content: space-between;
  }
`

const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: ${(props) => props.theme.space.sm};

  ${media.tablet} {
    column-gap: ${(props) => props.theme.space.md};
    ${(props) =>
      props.inputs &&
      `
      align-items: flex-start;
      flex-shrink: 0;
    `}
  }
`

export { Container, Wrapper }
