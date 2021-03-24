import { Title } from '@zendeskgarden/react-tooltips'
import styled from 'styled-components'

import { media } from '../../../../styles/mediaQueries'

const StyledTitle = styled(Title)`
  &::first-letter {
    text-transform: uppercase;
  }
`

const TooltipText = styled.p`
  color: ${(props) => props.theme.palette.grey[400]};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;
  text-decoration: underline;
  width: fit-content;

  &:hover {
    color: ${(props) => props.theme.palette.grey[600]};
  }

  ${media.tablet} {
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`

const Textarea = styled.textarea`
  border: none;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.palette.white};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-top: ${(props) => props.theme.space.xs};
  outline: none;
  overflow: hidden;
  resize: none;
  width: 220px;
`

export { StyledTitle, TooltipText, Textarea }
