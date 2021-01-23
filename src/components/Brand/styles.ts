import styled from 'styled-components'

import Icon from '../Icons'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const StyledIcon = styled(Icon)`
  height: 4rem;
  margin: 0 ${(props) => props.theme.space.sm} 0 0;
  width: 4rem;
`

export const Brandmark = styled.p`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin: 0;
`
