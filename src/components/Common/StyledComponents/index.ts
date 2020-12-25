import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.palette.grey[100]};
  padding-bottom: 30px;
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.space.xl};
  margin-top: 0;
`

const FieldGrid = styled.div`
  display: grid;
  row-gap: 10px;
`

export { Container, InnerContainer, Title, FieldGrid }
