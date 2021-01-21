import { useState } from 'react'

import keplr from '../keplr'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const useRequestUnlock = (tokenAddress: string = '') => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const requestUnlock = async () => {
    setLoading(true)
    const keplrClient = keplr.getKeplr()

    if (!keplrClient) {
      console.log('Keplr not installed.')
      setLoading(false)
      return
    }

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
