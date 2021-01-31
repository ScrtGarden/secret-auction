import { Button } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { FormEvent, memo, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import { CHANGE_MIN_BID_MAX_GAS } from '../../../../utils/constants'
import {
  useStoreActions,
  useStoreState,
} from '../../../../utils/hooks/storeHooks'
import useHasActiveBids from '../../../../utils/hooks/useHasActiveBids'
import keplr from '../../../../utils/keplr'
import parseErrorMessage from '../../../../utils/parseErrorMessage'
import splitPair from '../../../../utils/splitPair'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import toSmallestDenomination from '../../../../utils/toSmallestDenomination'
import InputWithSymbol from '../../Common/InputWithSymbol'
import {
  ModalContent,
  ModalHeader,
  ModalText,
  ModalTitle,
  Separator,
  StyledModal,
  StyledSkeleton,
} from '../../Common/StyledComponents'

const UpdateMinBidModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

  // custom hook
  const { loading: fetchingActiveBids, hasActiveBids } = useHasActiveBids(
    address
  )

  // store state
  const auctionInfo = useStoreState((state) =>
    state.profile.auctionById(address)
  )
  const { minimum_bid, pair, bid_decimals } = auctionInfo || {}
  const { bidTokenSymbol } = splitPair(pair)

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleUpdateMinBidModal
  )
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)
  const updateAuction = useStoreActions(
    (actions) => actions.profile.updateAuction
  )

  // component state
  const [amount, setAmount] = useState('0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const decimals = bid_decimals
    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      setAmount(amount)
    }
  }

  const onClick = async () => {
    setError('')

    if (!amount) {
      setError('Please enter valid amount.')
      return
    }

    setLoading(true)

    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: CHANGE_MIN_BID_MAX_GAS,
    })
    const amountInSmallestDenomination = toSmallestDenomination(
      amount,
      bid_decimals || 1
    )
    const handleMsg = {
      change_minimum_bid: {
        minimum_bid: amountInSmallestDenomination,
      },
    }

    try {
      await signingClient?.execute(address, handleMsg)
      updateAuction({ address, minimum_bid: amountInSmallestDenomination })
      setLoading(false)
      setAlert({
        title: 'Success',
        text: `Minimum bid updated to ${amount} ${bidTokenSymbol}`,
        type: AlertType.success,
      })
      onClose()
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

  const onClose = () => {
    router.push(`${router.route}`, `${router.asPath}`, { shallow: true })
    toggleModal()
  }

  return (
    <StyledModal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Update minimum bid</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        {fetchingActiveBids ? (
          <>
            <StyledSkeleton width="100%" height="14px" />
            <StyledSkeleton width="50%" height="14px" />
          </>
        ) : (
          <>
            <ModalText>
              {`Your current minimum bid is set at ${toBiggestDenomination(
                minimum_bid,
                bid_decimals
              )} ${bidTokenSymbol}.`}
            </ModalText>
            {hasActiveBids && (
              <>
                <Separator sm />
                <ModalText>
                  Currently, there are active bid/s on this auction. Any bids
                  that were validly placed will remain valid, however, future
                  placed bids will meet the new minimum.
                </ModalText>
              </>
            )}
          </>
        )}
        <Separator lg />
        <InputWithSymbol
          label="New Amount"
          symbol={bidTokenSymbol}
          value={amount}
          onChange={onChangeAmount}
          error={error}
        />
        <Separator md />
        <Button isPrimary isStretched onClick={onClick} disabled={loading}>
          {loading ? <Dots size="20" /> : 'Update Minimum Bid'}
        </Button>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(UpdateMinBidModal)
