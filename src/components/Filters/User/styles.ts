import styled from 'styled-components'

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-template-columns: 70px 69px 61px 69px 50px 55px 1fr 150px 150px;
  align-items: center;
`

export { Container }
