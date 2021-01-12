import styled from 'styled-components'

const TokenLabel = styled.div`
  align-items: center;
  color: ${(props) => props.theme.palette.green[600]};
  display: flex;
  background-color: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-bottom-right-radius: ${(props) => props.theme.borderRadii.md};
  border-top-right-radius: ${(props) => props.theme.borderRadii.md};
  font-size: ${(props) => props.theme.fontSizes.md};
  padding: 0 ${(props) => props.theme.space.sm};
`

export { TokenLabel }
