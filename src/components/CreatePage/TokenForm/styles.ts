import styled from 'styled-components'

const Container = styled.div``

const InnerContainer = styled.div`
  border-radius: ${(props) => props.theme.borderRadii.md};
  background-color: ${(props) => props.theme.palette.white};
`

const Header = styled.div`
  align-items: center;
  border-top-left-radius: ${(props) => props.theme.borderRadii.md};
  border-top-right-radius: ${(props) => props.theme.borderRadii.md};
  border: 1px solid ${(props) => props.theme.palette.kale[700]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${(props) => props.theme.space.sm} 0;
`

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin: 0;
`

const Fields = styled.div`
  padding: ${(props) => props.theme.space.sm};
`

const Separator = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.grey[200]};
  margin: ${(props) => props.theme.space.md} 0;
  width: 100%;
`

export { Container, Separator, Header, Title, Fields, InnerContainer }
