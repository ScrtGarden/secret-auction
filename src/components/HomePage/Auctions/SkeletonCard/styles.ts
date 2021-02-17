import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-radius: ${(props) => props.theme.borderRadii.md};
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.space.md};
  width: 300px;
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  height: 69px;
  margin: ${(props) => props.theme.space.md} 0;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: ${(props) => props.theme.space.sm} 0;
`

export { Container, Details, Wrapper }
