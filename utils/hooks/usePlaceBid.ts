import { useState } from 'react'

import { AlertType } from '../../store/controls/controls.models'
import addPadding from '../addPadding'
import { PLACE_BID_MAX_GAS } from '../constants'
import keplr from '../keplr'
import parseErrorMessage from '../parseErrorMessage'
import toSmallestDenomination from '../toSmallestDenomination'
import validator from '../validators/bid'
import { useStoreActions } from './storeHooks'
import useConnectToKeplr from './useConnectToKeplr'

interface PlaceBidData {
  amount: string
  minimumBid: string
  auctionAddress: string
  tokenAddress: string
  decimals: number
}

const usePlaceBid = () => {
  // custom hooks
  const [connectToKeplr] = useConnectToKeplr()

  // store actions
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)

  // hook state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [txHash, setTxHash] = useState<string | undefined>()

  const placeBid = async (data: PlaceBidData) => {
    const { amount, minimumBid, auctionAddress, tokenAddress, decimals } = data
    setLoading(true)

    const { error: connectionError } = await connectToKeplr()

    if (connectionError) {
      setLoading(false)
      return
    }

    setError('')

    const amountInSmallestDenomination = toSmallestDenomination(
      amount,
      decimals
    )

    const amountError = validator(amountInSmallestDenomination, minimumBid)
    if (amountError) {
      setError(amountError)
      setLoading(false)
      return
    }

    // place bid
    const handleMsg = {
      send: {
        recipient: auctionAddress,
        amount: amountInSmallestDenomination,
        padding: addPadding(amountInSmallestDenomination),
      },
    }

    const { secretjs } = await keplr.createSigningClient({
      maxGas: PLACE_BID_MAX_GAS,
    })

    try {
      const response = await secretjs?.execute(tokenAddress, handleMsg)
      setTxHash(response?.transactionHash)
      setLoading(false)
      return response
    } catch (error) {
      console.log('Error placing bid:', error.message)
      const text = parseErrorMessage(error.message)
      setAlert({
        title: 'Error',
        text,
        type: AlertType.error,
      })
      setLoading(false)
      return error
    }
  }

  return {
    loading,
    error,
    placeBid,
    txHash,
  }
}

export default usePlaceBid
