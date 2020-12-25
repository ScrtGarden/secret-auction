import styled from 'styled-components'

const Forms = styled.div`
  column-gap: ${(props) => props.theme.space.xxl};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: ${(props) => props.theme.space.lg};
`

export { Forms }
