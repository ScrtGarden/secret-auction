import keplr from '../keplr'
import { useStoreActions, useStoreState } from './storeHooks'

const useConnectToKeplr = () => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // store actions
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleGetKeplrModal
  )

  const connectToKeplr = async () => {
    if (!isConnected) {
      const connect = await keplr.connect()

      if (connect.success) {
        const accountsResponse = await keplr.getAccounts()
        if (accountsResponse.accounts) {
          setAccounts(accountsResponse.accounts)
          return { success: true }
        }
      } else if (connect.error?.message === 'Kelpr not installed.') {
        console.log('Kelpr not installed.')
        toggleModal()
        return { error: { message: connect.error?.message } }
      } else {
        console.log('Did not accept approval from Keplr.')
        setAccounts([])
        return { error: { message: connect.error?.message } }
      }
    }

    return { success: true }
  }

  return [connectToKeplr]
}

export default useConnectToKeplr
