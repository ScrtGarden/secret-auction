import { Button } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'

type ButtonProps = {
  readonly isLong?: boolean
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space.xxl};
`

const Circle = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.grey[300]};
  height: 80px;
  margin-right: ${(props) => props.theme.space.md};
  width: 80px;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Address = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0 0 ${(props) => props.theme.space.xs} 0;
`

const StyledButton = styled(Button)<ButtonProps>`
  width: ${(props) => (props.isLong ? '134px' : '114px')};
`

const CopyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Dot = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  margin: 0 ${(props) => props.theme.space.xs};
`

const Buttons = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
`

export {
  Container,
  Circle,
  Address,
  Wrapper,
  StyledButton,
  CopyWrapper,
  Dot,
  Buttons,
}
