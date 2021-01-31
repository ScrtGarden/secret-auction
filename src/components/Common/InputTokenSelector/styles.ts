import { Button } from '@zendeskgarden/react-buttons'
import { Field, InputGroup } from '@zendeskgarden/react-forms'
import styled from 'styled-components'

import Icon from '../../Icons'

interface StyledFieldProps {
  readonly priority?: number
}

interface StyledIconProps {
  readonly disabled?: boolean
}

const Container = styled.div``

const StyledField = styled(Field).attrs<StyledFieldProps>((props) => ({
  style: {
    zIndex: props.priority || 0,
  },
}))<StyledFieldProps>``

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

const StyledButton = styled(Button)`
  :last-child() {
    border: 1px solid;
  }
`

const StyledIcon = styled(Icon)<StyledIconProps>`
  fill: ${(props) =>
    props.disabled
      ? props.theme.palette.grey[400]
      : props.theme.palette.blue[600]};
`

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space.xs};
`

export {
  Container,
  StyledField,
  StyledButton,
  StyledInputGroup,
  StyledIcon,
  Header,
}
