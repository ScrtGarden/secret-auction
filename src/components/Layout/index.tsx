import { useEffect, useMemo } from 'react'

import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import useGetAccounts from '../../../utils/hooks/useGetAccounts'
import Alert from '../Alert'
import Footer from '../Footer'
import Header from '../Header'
import BidModal from '../Modals/Bid'
import GetKeplrModal from '../Modals/GetKeplr'
import RetractBidModal from '../Modals/RetractBid'
import UpdateBidModal from '../Modals/UpdateBid'

type Props = {
  children?: React.ReactElement
}

const Layout = ({ children }: Props) => {
  const store = useStoreState((state) => state)
  useMemo(() => console.log(store), [store])

  // store actions
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)

  // store state
  const isGetKeplrModalOpen = useStoreState(
    (state) => state.controls.isGetKeplrModalOpen
  )
  const isBidModalOpen = useStoreState((state) => state.controls.isBidModalOpen)
  const showAlert = useStoreState((state) => state.controls.showAlert)
  const isUpdateBidModalOpen = useStoreState(
    (state) => state.controls.isUpdateBidModalOpen
  )
  const isRetractBidOpen = useStoreState(
    (state) => state.controls.isRetractBidModalOpen
  )

  // custom hooks
  const { loading, accounts } = useGetAccounts()

  useEffect(() => {
    if (accounts.length > 0) {
      setAccounts(accounts)
    } else {
      setAccounts([])
    }
  }, [loading])

  return (
    <>
      <Header />
      {children}
      <Footer />

      {/* modals */}
      {isGetKeplrModalOpen && <GetKeplrModal />}
      {isBidModalOpen && <BidModal />}
      {isUpdateBidModalOpen && <UpdateBidModal />}
      {isRetractBidOpen && <RetractBidModal />}

      {/* alerts */}
      {showAlert && <Alert />}
    </>
  )
}

export default Layout
