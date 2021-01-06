import styled from 'styled-components'

interface HeaderProps {
  readonly fullborders?: boolean
  readonly margintop?: boolean
}

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.xl};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: ${(props) => props.theme.space.xl};
`

const Wrapper = styled.div``

const Header = styled.div<HeaderProps>`
  background-color: ${(props) => props.theme.palette.kale[700]};
  border-top-left-radius: ${(props) =>
    props.fullborders ? 0 : props.theme.borderRadii.md};
  border-top-right-radius: ${(props) =>
    props.fullborders ? 0 : props.theme.borderRadii.md};
  color: ${(props) => props.theme.palette.white};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space.sm};
  ${(props) => props.margintop && `margin-top: ${props.theme.space.lg}`};
  padding: ${(props) => props.theme.space.xs} 0;
  text-align: center;
`

export { Container, Header, Wrapper }
