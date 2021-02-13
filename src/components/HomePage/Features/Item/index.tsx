import { FC, memo } from 'react'

import { Feature } from '../../../../../utils/constants'
import { Container, Image, Text, Title } from './styles'

type Props = {
  item: Feature
}

const Item: FC<Props> = (props) => {
  const { title, description, icon, link } = props.item
  return (
    <Container>
      <Image name={icon} />
      <Title>{title}</Title>
      <Text>{description}</Text>
    </Container>
  )
}

export default memo(Item)
