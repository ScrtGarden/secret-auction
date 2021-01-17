import {
  Button,
  ChevronButton,
  SplitButton,
} from '@zendeskgarden/react-buttons'
import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns'
import styled from 'styled-components'

const StyledSplitButton = styled(SplitButton)`
  button {
    height: 20px;
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
