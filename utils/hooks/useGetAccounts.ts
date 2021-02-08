import { useEffect } from 'react'

import keplr from '../keplr'
import { useStoreActions } from './storeHooks'

const useGetAccounts = () => {
  // store actions
  const setStoreAccounts = useStoreActions(
    (actions) => actions.auth.setAccounts
  )

  useEffect(() => {
    let isMounted = true
    const getAccounts = async () => {
      const { accounts } = await keplr.getAccounts()

      if (accounts) {
        if (isMounted) {
          setStoreAccounts(accounts)
        }
      } else {
        if (isMounted) {
          setStoreAccounts([])
        }
      }
    }

    getAccounts()

    return () => {
      isMounted = false
    }
  }, [])
}

export default useGetAccounts
