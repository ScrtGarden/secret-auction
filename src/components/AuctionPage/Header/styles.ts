import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'
import Icon from '../../Icons'

interface SymbolProps {
  readonly bid?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};

  ${media.tablet} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`

const Pair = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
`

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;

  ${(props) =>
    props.bid &&
    `
    color: ${props.theme.palette.grey[500]};
    font-size: ${props.theme.fontSizes.md};
    font-weight: ${props.theme.fontWeights.regular};
  `}

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.xxl};

    ${(props) =>
      props.bid &&
      `
    color: ${props.theme.palette.grey[500]};
    font-size: ${props.theme.fontSizes.xl};
    font-weight: ${props.theme.fontWeights.regular};
  `}
  }
`

const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Address = styled.h1`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  margin: 0 ${(props) => props.theme.space.sm} 0 0;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.lg};
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[600]};
  && {
    height: 14px;
    width: 14px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  :last-child {
    align-items: flex-start;

    ${media.tablet} {
      align-items: flex-end;
    }
  }
`

const EndDate = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin-bottom: ${(props) => props.theme.space.xs};
  margin-top: 0;

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`

export {
  Container,
  Pair,
  Symbol,
  Address,
  AddressWrapper,
  StyledIcon,
  Wrapper,
  EndDate,
}
