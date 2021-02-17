import { Button } from '@zendeskgarden/react-buttons'
import Router from 'next/router'
import { memo } from 'react'

import { InnerContainer } from '../../Common/StyledComponents'
import {
  Container,
  Content,
  Heading,
  StyledButton,
  StyledIcon,
  Text,
} from './styles'

const Landing = () => {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Heading>Look mom, no price slippage.</Heading>
          <Text>
            Bid, create and interact with sealed bid auctions. Powered by Secret
            Network.
          </Text>
          <StyledButton isPrimary onClick={() => Router.push('/create')}>
            Explore
            <Button.EndIcon>
              <StyledIcon name="arrow-right" />
            </Button.EndIcon>
          </StyledButton>
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default memo(Landing)
