import styled from 'styled-components'

import Icon from '../../Icons'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space.md};
`

const StartIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[500]};
`

const DropdownEndIcon = styled(Icon)`
  && {
    fill: ${(props) => props.theme.palette.blue[500]};
    height: 14px;
    width: 14px;
  }
`

export { Container, StartIcon, DropdownEndIcon }
