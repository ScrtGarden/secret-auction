import styled from 'styled-components'

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.xxl};
  display: grid;
  border-top-left-radius: ${(props) => props.theme.borderRadii.md};
  border-top-right-radius: ${(props) => props.theme.borderRadii.md};
  background-color: ${(props) => props.theme.palette.kale[600]};
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  padding: ${(props) => props.theme.space.sm};
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.white};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;
`

export { Container, Text }
