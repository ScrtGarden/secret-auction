import { useContext, useEffect, useState } from 'react'

import { FACTORY_CONTRACT_ADDRESS } from '../constants'
import { SecretJsContext } from '../secretjs'

interface Options {
  before?: number
  page_size?: number
}

type Params = {
  list_active_auctions?: {}
  list_closed_auctions?: Options
}

const useGetAuctions = (queryMsg: Params) => {
  const { secretjs } = useContext(SecretJsContext)
  const [loading, setLoading] = useState(false)
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    let isMounted = true
    const getAuctions = async () => {
      setLoading(true)
      try {
        const response = await secretjs?.queryContractSmart(
          FACTORY_CONTRACT_ADDRESS,
          queryMsg
        )
        const { list_active_auctions, list_closed_auctions } = response

        if (list_active_auctions?.active && isMounted) {
          setAuctions(list_active_auctions.active)
        } else if (list_closed_auctions?.closed && isMounted) {
          setAuctions(list_closed_auctions.closed)
        }
      } catch (error) {
        console.log('Error fetching auctions', error.message)
      }

      if (isMounted) {
        setLoading(false)
      }
    }

    getAuctions()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    loading,
    auctions,
  }
}

export default useGetAuctions
