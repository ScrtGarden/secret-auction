import { useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import keplr from '../keplr'
import { useStoreState } from './storeHooks'

type ErrorResponse = {
  message?: string
}

const useSecretJs = () => {
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const [secretjs, setSecretJs] = useState<SigningCosmWasmClient>()
  const [error, setError] = useState<ErrorResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const createClient = async () => {
    setLoading(true)
    const {
      error: errorResponse,
      secretjs: secretjsResponse,
    } = await keplr.createClient()
    console.log(errorResponse, secretjsResponse)
    if (secretjsResponse) {
      setSecretJs(secretjsResponse)
      setError(undefined)
    } else {
      setError(errorResponse)
      setSecretJs(undefined)
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
  }, [isConnected])

  return { error, secretjs, loading }
}

export default useSecretJs
