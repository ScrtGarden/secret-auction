import { useEffect, useState } from 'react'

import keplr from '../keplr'
import { useStoreState } from './storeHooks'

type ErrorResponse = {
  message?: string
}

const useGetAccounts = () => {
  const storeAccounts = useStoreState((state) => state.auth.accounts)
  const [accounts, setAccounts] = useState(storeAccounts)
  const [error, setError] = useState<ErrorResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const getAccounts = async () => {
    const { error: errorResponse, accounts } = await keplr.getAccounts()

    if (accounts) {
      setAccounts(accounts)
    } else {
      setError(errorResponse)
      setAccounts([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
      getAccounts()
    } else {
      window.addEventListener('load', async () => getAccounts())
    }

    if (document.readyState !== 'complete') {
      return window.removeEventListener('load', async () => getAccounts())
    }
  }, [])

  return { error, accounts, loading }
}

export default useGetAccounts
