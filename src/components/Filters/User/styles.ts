import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'
import InputWithDropdown from '../../Common/InputWithDropdown'

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  ${media.tablet} {
    align-items: center;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.xs};

  ${media.tablet} {
    align-items: center;
    column-gap: ${(props) => props.theme.space.sm};
    flex-direction: row;
  }
`

const StyledInputWithDropdown = styled(InputWithDropdown)`
  width: 120px;
`

export { Container, Wrapper, StyledInputWithDropdown }
