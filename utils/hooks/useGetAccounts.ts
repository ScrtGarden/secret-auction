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

  useEffect(() => {
    let isMounted = true
    const getAccounts = async () => {
      const { error: errorResponse, accounts } = await keplr.getAccounts()

      if (accounts) {
        if (isMounted) {
          setAccounts(accounts)
        }
      } else {
        if (isMounted) {
          setError(errorResponse)
          setAccounts([])
        }
      }
      if (isMounted) {
        setLoading(false)
      }
    }

    getAccounts()

    return () => {
      isMounted = false
    }
  }, [])

  return { error, accounts, loading }
}

export default useGetAccounts
