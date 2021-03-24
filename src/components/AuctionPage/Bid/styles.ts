import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'

interface TextProps {
  readonly small?: boolean
}

interface FieldProps {
  readonly grow?: boolean
}

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => props.theme.borderRadii.md};
  box-shadow: #0000001a 0px 0px 8px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => `${props.theme.space.sm} ${props.theme.space.md}`};

  ${media.tablet} {
    padding: ${(props) => `${props.theme.space.md} ${props.theme.space.lg}`};
  }
`

const Title = styled.h2`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: ${(props) => props.theme.space.md};
  margin-top: 0;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.lg};
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${(props) => props.theme.space.md} 0;

  ${media.tablet} {
    padding: ${(props) => props.theme.space.lg} 0;
  }
`

const Field = styled.div<FieldProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space.xs};
  width: 100%;

  ${(props) =>
    props.grow &&
    `
    margin-bottom: ${props.theme.space.xl};
  `};

  :last-child {
    margin-bottom: 0;
  }

  ${media.tablet} {
    ${(props) =>
      props.grow &&
      `
      align-items: flex-start;
      flex: 1;
    `};
  }
`

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;

  ${(props) =>
    props.small &&
    `
      color: ${props.theme.palette.grey[600]};
      font-size: ${props.theme.fontSizes.sm};
  `}

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.lg};

    ${(props) =>
      props.small &&
      `
      color: ${props.theme.palette.grey[600]};
      font-size: ${props.theme.fontSizes.md};
  `}
  }
`

export { Container, Title, Details, Text, Field }
