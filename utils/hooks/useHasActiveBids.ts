import { useContext, useEffect, useState } from 'react'

import { SecretJsContext } from '../secretjs'
import { useStoreState } from './storeHooks'

const useHasActiveBids = (auctionAddress: string) => {
  const { secretjs: queryClient } = useContext(SecretJsContext)

  const address = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) => state.auth.connectedViewingKey)

  const [loading, setLoading] = useState(false)
  const [hasActiveBids, setHasActiveBids] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    const hasActiveBids = async () => {
      setLoading(true)
      const queryMsg = {
        has_bids: {
          address,
          viewing_key: viewingKey,
        },
      }
      try {
        const response = await queryClient?.queryContractSmart(
          auctionAddress,
          queryMsg
        )
        const { has_bids, viewing_key_error } = response

        if (has_bids) {
          if (isMounted) {
            setHasActiveBids(has_bids.has_bids)
          }
        } else if (viewing_key_error) {
          if (isMounted) {
            setError(viewing_key_error.error)
          }
        }
      } catch (error) {
        console.log('Error getting active bids', error.message)
        if (isMounted) {
        }
        setError(error.message)
      }

      if (isMounted) {
        setLoading(false)
      }
    }

    hasActiveBids()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    hasActiveBids,
    loading,
    error,
  }
}

export default useHasActiveBids
