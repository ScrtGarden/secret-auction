import { Button } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { format, getUnixTime } from 'date-fns'
import { useRouter } from 'next/router'
import { memo, useMemo, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import {
  DATE_FORMAT,
  EXTEND_MAX_GAS,
  FINALIZE_MAX_GAS,
} from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
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
import validate from '../../../../utils/validators/extend'
import {
  ModalButtons,
  ModalContent,
  ModalHeader,
  ModalText,
  ModalTitle,
  StyledModal,
  StyledSkeleton,
} from '../../Common/StyledComponents'
import NoActiveBids from './NoActiveBids'

const FinalizeAuctionModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

  // custom hooks
  const { loading: fetchingActiveBids, hasActiveBids } = useHasActiveBids(
    address
  )

  // store state
  const auctionInfo = useStoreState((state) =>
    state.profile.auctionById(address)
  )
  const { bid_decimals, pair, minimum_bid } = auctionInfo || {}
  const { bidTokenSymbol } = useMemo(() => splitPair(pair), [pair])

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
  const [radioValue, setRadioValue] = useState('finalize')
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(
    toBiggestDenomination(minimum_bid, bid_decimals)
  )
  const [errors, setErrors] = useState({ date: '', amount: '' })

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
      setLoading(false)
    }
  }

  const onClickExtend = async () => {
    setErrors({ date: '', amount: '' })
    const { hasErrors, date: dateErr, amount: amountErr } = validate(
      date,
      amount
    )

    if (hasErrors) {
      setErrors({ date: dateErr, amount: amountErr })
      return
    }

    setLoading(true)

    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: EXTEND_MAX_GAS,
    })

    try {
      const unixTime = getUnixTime(date)
      const amountInSmallestDenomination = toSmallestDenomination(
        amount,
        bid_decimals
      )
      const handleMsg = {
        finalize: {
          new_ends_at: unixTime,
          new_minimum_bid: amountInSmallestDenomination,
        },
      }

      await signingClient?.execute(address, handleMsg)
      updateAuction({
        address,
        ends_at: unixTime,
        minimum_bid: amountInSmallestDenomination,
      })
      setAlert({
        title: 'Success',
        text: `Your auction has been extended with a new expected close of ${format(
          date,
          DATE_FORMAT
        )} and a minimum bid of ${amount} ${bidTokenSymbol}`,
        type: AlertType.success,
      })
      onClose()
    } catch (error) {
      console.log('Error extending auction:', error.message)
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
        <ModalTitle>Finalize Auction</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        {fetchingActiveBids ? (
          <>
            <StyledSkeleton width="100%" height="14px" />
            <StyledSkeleton width="50%" height="14px" />
          </>
        ) : hasActiveBids ? (
          <ModalText>
            Are you sure you want to close and finalize the auction?
          </ModalText>
        ) : (
          <NoActiveBids
            radioValue={radioValue}
            onChange={setRadioValue}
            date={date}
            onChangeDate={setDate}
            amount={amount}
            onChangeAmount={setAmount}
            symbol={bidTokenSymbol}
            decimals={bid_decimals}
            errors={errors}
            loading={loading}
          />
        )}
        <ModalButtons>
          <Button isStretched isBasic onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            isStretched
            isPrimary
            disabled={loading}
            onClick={
              radioValue === 'finalize' ? onClickFinalize : onClickExtend
            }
          >
            {loading ? (
              <Dots size="20" />
            ) : radioValue === 'finalize' ? (
              'Finalize'
            ) : (
              'Extend'
            )}
          </Button>
        </ModalButtons>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(FinalizeAuctionModal)
