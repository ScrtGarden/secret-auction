import styled from 'styled-components'

const Grid = styled.div`
  column-gap: ${(props) => props.theme.space.xl};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export { Grid }
