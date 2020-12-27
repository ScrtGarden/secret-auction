import { useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import keplr from '../keplr'

type ErrorResponse = {
  message?: string
}

const useSecretJs = () => {
  const [secretjs, setSecretJs] = useState<SigningCosmWasmClient>()
  const [error, setError] = useState<ErrorResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const createClient = async () => {
    const {
      error: errorResponse,
      secretjs: secretjsResponse,
    } = await keplr.createClient()
    if (secretjsResponse) {
      setSecretJs(secretjsResponse)
    } else {
      setError(errorResponse)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
      createClient()
    } else {
      window.addEventListener('load', async () => createClient())
    }

    if (document.readyState !== 'complete') {
      return window.removeEventListener('load', async () => createClient())
    }
  }, [])

  return { error, secretjs, loading }
}

export default useSecretJs
