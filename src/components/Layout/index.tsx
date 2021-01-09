import { useEffect, useMemo } from 'react'

import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import useGetAccounts from '../../../utils/hooks/useGetAccounts'
import Footer from '../Footer'
import GetKeplrModal from '../GetKeplrModal'
import Header from '../Header'

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
      // modals
      {isGetKeplrModalOpen && <GetKeplrModal />}
    </>
  )
}

export default Layout
