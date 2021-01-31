import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.lg};
`

export { Container }
