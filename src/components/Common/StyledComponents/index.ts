import { Message } from '@zendeskgarden/react-forms'
import styled from 'styled-components'

type SeparatorProps = {
  readonly sm?: boolean
  readonly md?: boolean
  readonly lg?: boolean
}

const Container = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.palette.grey[100]};
  padding-bottom: 30px;
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.space.xl};
  margin-top: 0;
`

const FieldGrid = styled.div`
  display: grid;
  row-gap: 10px;
`

const StyledMessage = styled(Message)`
  margin-top: ${(props) => props.theme.space.xs};
`

const Separator = styled.div<SeparatorProps>`
  ${(props) => props.sm && `height: ${props.theme.space.sm}`};
  ${(props) => props.md && `height: ${props.theme.space.md}`};
  ${(props) => props.lg && `height: ${props.theme.space.lg}`};
`

export { Container, InnerContainer, Title, FieldGrid, StyledMessage, Separator }
