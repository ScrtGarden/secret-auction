import { Field, Input, InputGroup } from '@zendeskgarden/react-forms'
import styled from 'styled-components'

import Icon from '../../Icons'

const StyledField = styled(Field)`
  z-index: 1;
`

const StyledIcon = styled(Icon)``

const StyledInputGroup = styled(InputGroup)`
  background-color: ${(props) => props.theme.palette.white};

  & > *:first-child:not(:last-child) {
    border-right: none;
  }

  & > *:not(:first-child):not(:last-child) {
    border-bottom-right-radius: ${(props) => props.theme.borderRadii.md};
    border-top-right-radius: ${(props) => props.theme.borderRadii.md};
  }
`

const StyledInput = styled(Input)`
  text-transform: uppercase;
`

export { StyledIcon, StyledInputGroup, StyledInput, StyledField }
