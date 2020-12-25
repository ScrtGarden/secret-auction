import { FC, memo } from 'react'

import { Container, Text } from './styles'

const tabs = ['SELLING', 'IN EXCHANGE FOR', 'CONFIRM']

const Header: FC = () => {
  return (
    <Container>
      {tabs.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </Container>
  )
}

export default memo(Header)
