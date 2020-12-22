import { useCallback, useEffect, useState } from 'react'

import useGetAccounts from '../../../utils/hooks/useGetAccounts'
import keplr from '../../../utils/keplr'
import { Container } from './styles'

const Home: React.FC = () => {
  const { error, accounts, loading } = useGetAccounts()

  const onClick = async () => {
    const setupResponse = await keplr.setup()
    const accountsReponse = await keplr.getAccounts()

    console.log(accountsReponse)
  }

  return (
    <Container>
      Home
      <button onClick={onClick}>start</button>
    </Container>
  )
}

export default Home
