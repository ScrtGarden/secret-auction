import styled from 'styled-components'

import Icon from '../../Icons'

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin: 0;
`

const Unlock = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

const StyledIcon = styled(Icon)`
  margin-right: 5px;
`

export { Container, Text, Unlock, StyledIcon }
