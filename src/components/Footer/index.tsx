import { memo } from 'react'

import { GITHUB_LINK } from '../../../utils/constants'
import Brand from '../Brand'
import { InnerContainer } from '../Common/StyledComponents'
import { Anchor, Container, Content, Row, Text } from './styles'

const Footer = () => {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Row>
            <Brand
              iconColor="#fff"
              iconSize={26}
              fontSize={18}
              fontColor="#fff"
            />
            <Anchor href={GITHUB_LINK} target="_blank">
              Github
            </Anchor>
          </Row>
          <Row>
            <Text>Secret Garden x Mr. Roboto🤖's Secret</Text>
            <Text>{`© Secret Garden ${new Date().getFullYear()}`}</Text>
          </Row>
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default memo(Footer)
