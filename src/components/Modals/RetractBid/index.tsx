import { Button } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { memo, useMemo, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import { RETRACT_BID_MAX_GAS } from '../../../../utils/constants'
import {
  useStoreActions,
  useStoreState,
} from '../../../../utils/hooks/storeHooks'
import useGetBid from '../../../../utils/hooks/useGetBid'
import keplr from '../../../../utils/keplr'
import parseErrorMessage from '../../../../utils/parseErrorMessage'
import splitPair from '../../../../utils/splitPair'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import {
  ModalContent,
  ModalHeader,
  ModalText,
  ModalTitle,
  StyledModal,
} from '../../Common/StyledComponents'
import { Buttons, StyledSkeleton } from './styles'

const RetractBidModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

  // custom hook
  const { loading: loadingBid, data } = useGetBid(address)

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleRetractBidModal
  )
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)
  const removeAuction = useStoreActions(
    (actions) => actions.profile.removeAuction
  )

  // store state
  const auctionInfo = useStoreState((state) =>
    state.profile.auctionById(address)
  )

  // component state
  const [loading, setLoading] = useState(false)

  const { bidTokenSymbol } = useMemo(() => splitPair(auctionInfo?.pair), [
    auctionInfo,
  ])

  const onClickRetractBid = async () => {
    setLoading(true)
    const { secretjs } = await keplr.createSigningClient({
      maxGas: RETRACT_BID_MAX_GAS,
    })

    try {
      const handleMsg = {
        retract_bid: {},
      }
      const response = await secretjs?.execute(address, handleMsg)
      console.log(response)
      removeAuction(address)
      setAlert({
        title: 'Success',
        text: `Your request to retract ${toBiggestDenomination(
          data?.amount,
          data?.decimals
        )} ${bidTokenSymbol} has been placed.`,
        type: AlertType.success,
      })
      setLoading(false)
      toggleModal()
    } catch (error) {
      const text = parseErrorMessage(error.message)
      setAlert({
        title: 'Error',
        text,
        type: AlertType.error,
      })
      setLoading(false)
    }
  }

  return (
    <StyledModal onClose={() => toggleModal()}>
      <ModalHeader>
        <ModalTitle>Retract bid</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        {loadingBid ? (
          <>
            <StyledSkeleton width="100%" height="14px" />
            <StyledSkeleton width="50%" height="14px" />
          </>
        ) : (
          <ModalText>
            {data?.status === 'Success'
              ? `You've made a bid of ${toBiggestDenomination(
                  data?.amount,
                  data?.decimals
                )} ${bidTokenSymbol} on ${
                  data?.time_placed
                }. Are you sure you want to pull out?`
              : data?.message}
          </ModalText>
        )}
        <Buttons>
          <Button
            isStretched
            isBasic
            onClick={() => toggleModal()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            isStretched
            isDanger
            isPrimary
            disabled={loadingBid || loading}
            onClick={onClickRetractBid}
          >
            {loading ? <Dots size="20" /> : 'Retract Bid'}
          </Button>
        </Buttons>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(RetractBidModal)
