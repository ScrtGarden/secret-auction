import { Button } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { memo, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import { FINALIZE_MAX_GAS } from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import keplr from '../../../../utils/keplr'
import parseErrorMessage from '../../../../utils/parseErrorMessage'
import {
  ModalContent,
  ModalHeader,
  ModalText,
  ModalTitle,
  StyledModal,
} from '../../Common/StyledComponents'
import { Buttons } from './styles'

const FinalizeAuctionModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleFinalizeModal
  )
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)
  const updateAuction = useStoreActions(
    (actions) => actions.profile.updateAuction
  )

  // component state
  const [loading, setLoading] = useState(false)

  const onClickFinalize = async () => {
    setLoading(true)

    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: FINALIZE_MAX_GAS,
    })

    try {
      const response = await signingClient?.execute(address, { finalize: {} })
      const { data } = response || {}
      const decodedData = decoder(data)
      const { winning_bid, message } = decodedData.close_auction
      const winner = message.includes('Your bid won!')
      updateAuction({
        address,
        active: false,
        ends_at: undefined,
        winning_bid,
        minimum_bid: undefined,
        winner,
      })
      setAlert({
        title: 'Success',
        text: message,
        type: AlertType.success,
      })
      onClose()
    } catch (error) {
      console.log('Error finalizing auction:', error.message)
      const text = parseErrorMessage(error.message)
      setAlert({
        title: 'Error',
        text,
        type: AlertType.error,
      })
    }

    setLoading(false)
  }

  const onClose = () => {
    router.push(`${router.route}`, `${router.asPath}`, { shallow: true })
    toggleModal()
  }

  return (
    <StyledModal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Finalize Auction</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        <ModalText>
          Are you sure you want to close and finalize the auction?
        </ModalText>
        <Buttons>
          <Button isStretched isBasic onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            isStretched
            isPrimary
            disabled={loading}
            onClick={onClickFinalize}
          >
            {loading ? <Dots size="20" /> : 'Finalize'}
          </Button>
        </Buttons>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(FinalizeAuctionModal)
