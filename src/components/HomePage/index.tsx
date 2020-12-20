import { useStoreState } from '../../../utils/storeHooks'
import { Container } from './styles'

const Home: React.FC = () => {
  const count = useStoreState((state) => state.auth.count)
  console.log(count)

  return <Container>Home</Container>
}

export default Home
