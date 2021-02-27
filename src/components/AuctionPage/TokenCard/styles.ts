import styled from 'styled-components'

interface TitleProps {
  readonly large?: boolean
}

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
`

const Title = styled.h2<TitleProps>`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) =>
    props.large ? props.theme.fontSizes.lg : props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;
`

const Warning = styled.p`
  color: ${(props) => props.theme.palette.yellow[700]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xxs};
`

const Content = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.space.md};
`

const Details = styled.div`
  border-right: 1px solid ${(props) => props.theme.palette.grey[300]};
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.md};
  padding-right: ${(props) => props.theme.space.xs};
`

const Field = styled.div`
  margin-bottom: ${(props) => props.theme.space.xs};
`

const Lable = styled.p`
  color: ${(props) => props.theme.palette.grey[600]};
  margin-bottom: ${(props) => props.theme.space.xxs};
  margin-top: 0;
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  margin: 0;
`

const AmountWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Amount = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin: 0;
`

export {
  Container,
  Title,
  Content,
  Details,
  Field,
  Lable,
  Text,
  Warning,
  AmountWrapper,
  Amount,
}
