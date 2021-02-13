import styled from 'styled-components'

import Icon from '../../../Icons'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 300px;
`

const Image = styled(Icon)`
  height: 200px;
  width: 80%;
`

const Title = styled.h2`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: ${(props) => props.theme.space.sm};
  margin-top: ${(props) => props.theme.space.lg};
`

const Text = styled.p`
  color: ${(props) => props.theme.palette.grey[700]};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;
  margin: 0;
`

export { Container, Image, Title, Text }
