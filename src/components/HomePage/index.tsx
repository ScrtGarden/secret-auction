import Auctions from './Auctions'
import Landing from './Landing'
import { Container } from './styles'

const Home: React.FC = () => {
  return (
    <Container>
      <Landing />
      <Auctions />
    </Container>
  )
}

export default Home
