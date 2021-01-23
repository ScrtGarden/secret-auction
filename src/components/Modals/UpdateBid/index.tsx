import { Button } from '@zendeskgarden/react-buttons'
import { Dots, Skeleton } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { FormEvent, memo, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import addPadding from '../../../../utils/addPadding'
import { PLACE_BID_MAX_GAS } from '../../../../utils/constants'
import {
  useStoreActions,
  useStoreState,
} from '../../../../utils/hooks/storeHooks'
import useGetAuction from '../../../../utils/hooks/useGetAuction'
import useGetBid from '../../../../utils/hooks/useGetBid'
import keplr from '../../../../utils/keplr'
import parseErrorMessage from '../../../../utils/parseErrorMessage'
import splitPair from '../../../../utils/splitPair'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import toSmallestDenomination from '../../../../utils/toSmallestDenomination'
import validator from '../../../../utils/validators/bid'
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

const UpdateBidModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

  // custom hook
  const { loading: loadingBid, data } = useGetBid(address)
  const { data: auctionDetails } = useGetAuction(address)

  // store state
  const auctionInfo = useStoreState((state) =>
    state.profile.auctionById(address)
  )
  const { minimum_bid, pair, bid_decimals } = auctionInfo || {}
  const { bidTokenSymbol } = splitPair(pair)

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleUpdateBidModal
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

    const amountInSmallestDenomination = toSmallestDenomination(
      amount,
      bid_decimals
    )

    const bidAmountError = validator(amountInSmallestDenomination, minimum_bid)

    if (bidAmountError) {
      setError(bidAmountError)
      return
    }

    setLoading(true)

    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: PLACE_BID_MAX_GAS,
    })
    const handleMsg = {
      send: {
        recipient: address,
        amount: amountInSmallestDenomination,
        padding: addPadding(amountInSmallestDenomination),
      },
    }

    try {
      const response = await signingClient?.execute(
        auctionDetails?.bid_token.contract_address || '',
        handleMsg
      )
      setLoading(false)
      setAlert({
        title: 'Success',
        text: `Your bid of ${amount} ${bidTokenSymbol} has been successfully updated.`,
        type: AlertType.success,
      })
      onClose()
    } catch (error) {
      console.log('Error placing bid:', error.message)
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
        <ModalTitle>Update bid</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        {loadingBid ? (
          <Skeleton height="14px" width="50%" />
        ) : (
          <ModalText>
            {`Minimum bid: ${toBiggestDenomination(
              minimum_bid,
              bid_decimals
            )} ${bidTokenSymbol}`}
          </ModalText>
        )}
        <Separator sm />
        {loadingBid ? (
          <>
            <StyledSkeleton width="95%" height="14px" />
            <StyledSkeleton width="90%" height="14px" />
            <StyledSkeleton width="30%" height="14px" />
          </>
        ) : (
          <ModalText>
            {data?.status === 'Success'
              ? `You've made a bid of ${toBiggestDenomination(
                  data?.amount,
                  data?.decimals
                )} ${bidTokenSymbol} on ${
                  data?.time_placed
                }. Are you sure you want to update your bid?`
              : data?.message}
          </ModalText>
        )}
        <Separator lg />
        <InputWithSymbol
          label="New Amount"
          symbol={bidTokenSymbol}
          value={amount}
          onChange={onChangeAmount}
          error={error}
          showBalance
          tokenAddress={auctionDetails?.bid_token.contract_address}
          decimals={bid_decimals}
        />
        <Separator md />
        <Button
          isPrimary
          isStretched
          onClick={onClick}
          disabled={loading || loadingBid}
        >
          {loading ? <Dots size="20" /> : 'Update Bid'}
        </Button>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(UpdateBidModal)
