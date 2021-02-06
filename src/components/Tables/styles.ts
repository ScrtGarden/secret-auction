import { SortableCell } from '@zendeskgarden/react-tables'
import styled from 'styled-components'

interface SymbolProps {
  readonly bid?: boolean
}

const Pair = styled.div`
  display: flex;
  flex-direction: row;
`

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;

  ${(props) =>
    props.bid &&
    `
    color: ${props.theme.palette.grey[500]};
    font-size: ${props.theme.fontSizes.md};
    font-weight: ${props.theme.fontWeights.regular};
  `}
`

export const StyledSortableCell = styled(SortableCell)`
  && {
    padding-bottom: 15px;
    padding-top: 15px;
  }
`

export { Pair, Symbol }
