import { useStoreRehydrated } from 'easy-peasy'
import { useEffect, useState } from 'react'

const useDocumentReady = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (document.readyState === 'complete') {
      if (isMounted) {
        setReady(true)
      }
    } else {
      window.onload = () => {
        if (isMounted) {
          setReady(true)
        }
      }
    }

    return () => {
      isMounted = false
    }
  }, [])

  return {
    ready,
  }
}

export default useDocumentReady
