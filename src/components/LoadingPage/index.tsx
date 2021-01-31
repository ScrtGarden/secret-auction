import { Player } from '@lottiefiles/react-lottie-player'
import { FC, memo } from 'react'

import LOTTIE_FILE from '../../../public/lottie/plant.json'
import { BrandName } from '../Common/StyledComponents'
import { Container } from './styles'

const LoadingPage: FC = () => {
  return (
    <Container>
      <Player
        autoplay
        loop
        src={LOTTIE_FILE}
        style={{ width: '300px', height: '300px' }}
      />
      <BrandName>tulip</BrandName>
    </Container>
  )
}

export default memo(LoadingPage)
