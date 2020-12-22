import { useEffect, useState } from "react"

import keplr from "../keplr"

type ErrorResponse = {
  message?: string
}

const useGetAccounts = () => {
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState<ErrorResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const getAccounts = async () => {
    const { error: errorResponse, accounts } = await keplr.getAccounts()
    if (accounts) {
      setAccounts(accounts)
    } else {
      setError(errorResponse)
    }
    setLoading(false)
  }

  useEffect(() => {
    window.addEventListener('load', async () => getAccounts())

    return window.removeEventListener('load', async () => getAccounts())
  }, [])

  return { error, accounts, loading }
}

export default useGetAccounts