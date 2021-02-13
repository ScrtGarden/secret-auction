import { Button } from '@zendeskgarden/react-buttons'
import { memo } from 'react'

import { InnerContainer } from '../../Common/StyledComponents'
import {
  Container,
  Content,
  Heading,
  Image,
  ImageWrapper,
  StyledButton,
  StyledIcon,
  Text,
  Wrapper,
} from './styles'

const Landing = () => {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Wrapper>
            <Heading>Welcome to tulip</Heading>
            <Text>
              A place to create, bid and interact with sealed bid auctions.
              Powered by Secret Network.
            </Text>
            <StyledButton isPrimary>
              Start Here
              <Button.EndIcon>
                <StyledIcon name="arrow-right" />
              </Button.EndIcon>
            </StyledButton>
          </Wrapper>
          <ImageWrapper>
            <Image name="stats-man" />
          </ImageWrapper>
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default memo(Landing)
