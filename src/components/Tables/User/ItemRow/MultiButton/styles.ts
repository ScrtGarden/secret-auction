import { Button, SplitButton } from '@zendeskgarden/react-buttons'
import { Trigger } from '@zendeskgarden/react-dropdowns'
import styled from 'styled-components'

const StyledSplitButton = styled(SplitButton)`
  width: 100%;
  z-index: unset;

  button {
    height: 30px;
  }
`

const StyledButton = styled(Button)`
  && {
    border: 1px solid;
    :first-of-type:not(:last-of-type) {
      border-left-width: 1px;
    }
  }
`

const StyledTrigger = styled(Trigger)`
  && {
    border: 1px solid;
    :last-of-type:not(:first-of-type) {
      border-right-width: 1px;
    }
  }
`

export { StyledSplitButton, StyledButton, StyledTrigger }
