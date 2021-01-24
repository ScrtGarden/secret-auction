import styled from 'styled-components'

const Buttons = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  margin-top: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { Buttons }
