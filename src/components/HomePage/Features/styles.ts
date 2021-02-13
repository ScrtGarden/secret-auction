import styled from 'styled-components'

const Content = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 70px 0;
`

export { Content }
