import { useContext, useEffect, useState } from 'react'

import keplr from '../keplr'
import { SecretJsContext } from '../secretjs'
import { useStoreState } from './storeHooks'

const useGetBalance = (
  tokenAddress: string = '',
  deps: (string | boolean)[] = []
) => {
  const { secretjs: queryClient } = useContext(SecretJsContext)

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('0')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const getBalance = async () => {
      setLoading(true)

      const keplrClient = keplr.getKeplr()

      if (!keplrClient) {
        if (isMounted) {
          setError('Keplr not installed.')
          setLoading(false)
          return
        }
      }

      let viewingKey = ''
      try {
        viewingKey = await keplrClient.getSecret20ViewingKey(
          process.env.NEXT_PUBLIC_CHAIN_ID,
          tokenAddress
        )
      } catch (error) {
        console.log('Error getting viewing key:', error.message)
        if (isMounted) {
          setError(error.message)
          setLoading(false)
        }
        return
      }

      try {
        const queryMsg = {
          balance: {
            address: walletAddress,
            key: viewingKey,
          },
        }

        const result = await queryClient?.queryContractSmart(
          tokenAddress,
          queryMsg
        )

        if (isMounted) {
          setError('')
          setAmount(result.balance.amount)
        }
      } catch (error) {
        console.log('Error getting balance:', error.message)
        setError(error.message)
      }

      if (isMounted) {
        setLoading(false)
      }
    }

    if (tokenAddress && walletAddress) {
      getBalance()
    }

    return () => {
      isMounted = false
    }
  }, [tokenAddress, walletAddress, ...deps])

  return {
    loading,
    amount,
    error,
  }
}

export default useGetBalance
