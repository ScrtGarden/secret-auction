import styled from 'styled-components'

import Icon from '../../../../Icons'

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.palette.kale[600]};
  height: 20px;
  width: 20px;
`

export { StyledIcon }
