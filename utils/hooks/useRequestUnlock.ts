import { useState } from 'react'

import keplr from '../keplr'
import useConnectToKeplr from './useConnectToKeplr'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const useRequestUnlock = (tokenAddress: string = '') => {
  // custom hook
  const [connectToKelpr] = useConnectToKeplr()

  // hook state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const requestUnlock = async () => {
    setLoading(true)

    const { error } = await connectToKelpr()

    if (error) {
      setLoading(false)
      return
    }

    const keplrClient = keplr.getKeplr()

    try {
      await keplrClient.suggestToken(
        process.env.NEXT_PUBLIC_CHAIN_ID,
        tokenAddress
      )
      setSuccess(true)
    } catch (error) {
      console.log('Error request unlock:', error.message)
    }

    setLoading(false)
  }

  return {
    loading,
    success,
    requestUnlock,
  }
}

export default useRequestUnlock
