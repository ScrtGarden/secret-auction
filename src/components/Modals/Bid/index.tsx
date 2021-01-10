import {
  Close,
  Footer,
  FooterItem,
  Header,
  Modal,
} from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'

import { useStoreActions } from '../../../../utils/hooks/storeHooks'

const BidModal = () => {
  const router = useRouter()
  const { from } = router.query

  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleBidModal
  )

  const onClose = () => {
    toggleModal()
    if (from === 'accounts') {
      router.push('/auctions', '/auctions', { shallow: true })
    }
  }

  return (
    <Modal onClose={onClose}>
      <Header></Header>
    </Modal>
  )
}

export default BidModal
