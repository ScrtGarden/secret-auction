import { useMemo } from 'react'

import { useStoreState } from '../../../utils/hooks/storeHooks'
import useGetAccounts from '../../../utils/hooks/useGetAccounts'
import Alert from '../Alert'
import Footer from '../Footer'
import Header from '../Header'
import BidModal from '../Modals/Bid'
import FinalizeAuctionModal from '../Modals/Finalize'
import GetKeplrModal from '../Modals/GetKeplr'
import ImportKeyModal from '../Modals/ImportKey'
import RetractBidModal from '../Modals/RetractBid'
import UpdateBidModal from '../Modals/UpdateBid'
import UpdateMinBidModal from '../Modals/UpdateMinBid'

type Props = {
  children?: React.ReactElement
}

const SiteLayout = ({ children }: Props) => {
  const store = useStoreState((state) => state)
  useMemo(() => console.log(store), [store])

  // store state
  const isGetKeplrModalOpen = useStoreState(
    (state) => state.controls.isGetKeplrModalOpen
  )
  const isBidModalOpen = useStoreState((state) => state.controls.isBidModalOpen)
  const isUpdateMinBidModalOpen = useStoreState(
    (state) => state.controls.isUpdateMinBidModalOpen
  )
  const isRetractBidOpen = useStoreState(
    (state) => state.controls.isRetractBidModalOpen
  )
  const isUpdateBidModalOpen = useStoreState(
    (state) => state.controls.isUpdateBidModalOpen
  )
  const isFinalizeModalOpen = useStoreState(
    (state) => state.controls.isFinalizeModalOpen
  )
  const isImportKeyModalOpen = useStoreState(
    (state) => state.controls.isImportKeyModalOpen
  )

  // custom hooks
  useGetAccounts()

  return (
    <>
      <Header />
      {children}
      <Footer />

      {/* modals */}
      {isGetKeplrModalOpen && <GetKeplrModal />}
      {isBidModalOpen && <BidModal />}
      {isUpdateMinBidModalOpen && <UpdateMinBidModal />}
      {isRetractBidOpen && <RetractBidModal />}
      {isUpdateBidModalOpen && <UpdateBidModal />}
      {isFinalizeModalOpen && <FinalizeAuctionModal />}
      {isImportKeyModalOpen && <ImportKeyModal />}

      {/* alerts */}
      <Alert />
    </>
  )
}

const getLayout = (page: JSX.Element) => <SiteLayout>{page}</SiteLayout>

export { SiteLayout as default, getLayout }
