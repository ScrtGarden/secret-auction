import styled from 'styled-components'

const Grid = styled.div`
  column-gap: ${(props) => props.theme.space.xxl};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 850px;
`

export { Grid }
