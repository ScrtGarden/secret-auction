import { useContext, useEffect, useState } from 'react'

import { DetailedAuctionInfo, ErrorResponse } from '../../interfaces/index'
import { SecretJsContext } from '../secretjs'

interface UseGetAuction {
  loading: boolean
  data: DetailedAuctionInfo | undefined
  error: ErrorResponse | undefined
}

const useGetAuction = (address: string): UseGetAuction => {
  const { secretjs } = useContext(SecretJsContext)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [error, setError] = useState<ErrorResponse>()

  useEffect(() => {
    let isMounted = true

    const fetchAuction = async () => {
      const queryMsg = {
        auction_info: {},
      }

      try {
        const response = await secretjs?.queryContractSmart(address, queryMsg)
        const { auction_info } = response

        if (auction_info) {
          if (isMounted) {
            setData(auction_info)
          }
        }
      } catch (error) {
        if (isMounted) {
          setError({ error: { message: error.message } })
        }
      }

      if (isMounted) {
        setLoading(false)
      }
    }

    fetchAuction()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    loading,
    data,
    error,
  }
}

export default useGetAuction
