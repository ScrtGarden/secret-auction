import styled from 'styled-components'

const Content = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.xxl};
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.lg};
  flex: 1;
`

export { Content, Cards }
