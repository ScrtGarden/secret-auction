import styled from 'styled-components'

import { media } from '../../styles/mediaQueries'

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.kale[700]};
`

const Content = styled.div``

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space.md} 0;

  :first-child {
    border-bottom: 1px solid ${(props) => props.theme.palette.kale[500]};
  }
`

const Anchor = styled.a`
  color: ${(props) => props.theme.palette.white};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.md};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const Text = styled.h1`
  color: ${(props) => props.theme.palette.white};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;

  :last-child {
    text-align: right;
  }
`

export { Container, Content, Row, Anchor, Text }
