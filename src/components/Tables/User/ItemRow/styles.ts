import { Button } from '@zendeskgarden/react-buttons'
import { Tag } from '@zendeskgarden/react-tags'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 18px;
`

const StyledTag = styled(Tag)`
  :last-child:not(:first-of-type) {
    margin-left: ${(props) => props.theme.space.xs};
  }
`

export { StyledButton, StyledTag }
