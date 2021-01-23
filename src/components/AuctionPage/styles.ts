import styled from 'styled-components'

import Icon from '../Icons'

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.space.sm};
  margin-top: 0;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const Address = styled.h1`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  margin: 0 ${(props) => props.theme.space.sm} 0 0;
`

export const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[600]};
  && {
    height: 14px;
    width: 14px;
  }
`
