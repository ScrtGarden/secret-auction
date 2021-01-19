import { useContext, useEffect, useState } from 'react'

import { ViewBidResponse } from '../../interfaces'
import { SecretJsContext } from '../secretjs'
import { useStoreState } from './storeHooks'

const useGetBid = (address: string) => {
  const { secretjs } = useContext(SecretJsContext)

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) => state.auth.connectedViewingKey)

  const [data, setData] = useState<ViewBidResponse>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const getBidInfo = async () => {
      setLoading(true)
      const queryMsg = {
        view_bid: { address: walletAddress, viewing_key: viewingKey },
      }

      try {
        const response = await secretjs?.queryContractSmart(address, queryMsg)
        const { amount_bid, bid_decimals, message, status } = response.bid
        const isSuccess = status === 'Success'
        const parsedMessage = isSuccess
          ? message.replace('Bid placed ', '')
          : ''

        if (isMounted) {
          setData({
            status,
            amount: amount_bid,
            decimals: bid_decimals,
            time_placed: parsedMessage,
            message,
          })
        }
      } catch (error) {
        console.log('Could not get user bid details:', error.message)
      }

      if (isMounted) {
        setLoading(false)
      }

      return () => {
        isMounted = false
      }
    }

    getBidInfo()
  }, [])

  return {
    loading,
    data,
  }
}

export default useGetBid
