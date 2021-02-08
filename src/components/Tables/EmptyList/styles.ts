import { Row } from '@zendeskgarden/react-tables'
import styled from 'styled-components'

import Icon from '../../Icons'

const Container = styled.div`
  border: 1px solid;
  display: flex;
  width: 100%;
`

const StyledRow = styled(Row)`
  border-bottom: none;
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[500]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin: 0;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[500]};
  height: 50px;
  margin: ${(props) => props.theme.space.lg} 0;
  width: 50px;
`

export { Container, StyledRow, Content, Text, StyledIcon }
