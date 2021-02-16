import { InnerContainer } from '../Common/StyledComponents'
import Features from './Features'
import Landing from './Landing'
import { Container } from './styles'
import Validator from './Validator'

const Home: React.FC = () => {
  return (
    <Container>
      <Landing />
      <Features />
      <Validator />
    </Container>
  )
}

export default Home
