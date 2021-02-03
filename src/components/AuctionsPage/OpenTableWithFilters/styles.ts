import styled from 'styled-components'

const Container = styled.div`
  margin-top: ${(props) => props.theme.space.xl};
`

const Wrapper = styled.div`
  padding: 0 ${(props) => props.theme.space.xxs};
`

export { Container, Wrapper }
