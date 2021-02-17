import styled from 'styled-components'

interface SymbolProps {
  readonly bid?: boolean
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-radius: ${(props) => props.theme.borderRadii.md};
  cursor: pointer;
  padding: ${(props) => props.theme.space.md};
  width: 300px;
`

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;

  ${(props) =>
    props.bid &&
    `
    color: ${props.theme.palette.grey[500]};
    font-weight: ${props.theme.fontWeights.regular};
  `}
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${(props) => props.theme.space.md} 0;
`

const Wrapper = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.space.sm} 0;

  :first-child {
    border-right: 1px solid ${(props) => props.theme.palette.grey[300]};
  }
`

const Label = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-top: 0;
  text-align: center;
`

const Amount = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin: 0;
  text-align: center;
`

const CloseText = styled.p`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin: 0;
  text-align: center;
`

export { Container, Pair, Symbol, Details, Wrapper, Label, Amount, CloseText }
