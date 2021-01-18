import styled from 'styled-components'

const Content = styled.div`
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;
`

export { Content, Text }
