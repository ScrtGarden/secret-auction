import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { AlertType } from '../../../../store/controls/controls.models'
import addPadding from '../../../../utils/addPadding'
import { PLACE_BID_MAX_GAS } from '../../../../utils/constants'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import useConnectToKeplr from '../../../../utils/hooks/useConnectToKeplr'
import useGetAuction from '../../../../utils/hooks/useGetAuction'
import keplr from '../../../../utils/keplr'
import parseErrorMessage from '../../../../utils/parseErrorMessage'
import toSmallestDenomination from '../../../../utils/toSmallestDenomination'
import validator from '../../../../utils/validators/bid'
import {
  ModalHeader,
  ModalTitle,
  StyledModal,
} from '../../Common/StyledComponents'
import Details from './Details'
import Success from './Success'

const BidModal = () => {
  const router = useRouter()
  const { from, address } = router.query as BidRouterQuery

  // custom hooks
  const { loading: loadingAuctionInfo, data, error } = useGetAuction(address)
  const [connectToKeplr] = useConnectToKeplr()

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleBidModal
  )
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)

  // component state
  const [amount, setAmount] = useState('0')
  const [bidAmountError, setBidAmountError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [txHash, setTxHash] = useState<string | undefined>('')

  const onClose = () => {
    toggleModal()
    if (from === 'accounts') {
      router.push('/auctions', '/auctions', { shallow: true })
    }
  }

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const decimals = data?.bid_token.token_info.decimals
    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      setAmount(amount)
    }
  }

  const onSubmit = async () => {
    setBidAmountError('')
    const amountInSmallestDenomination = toSmallestDenomination(
      amount,
      data?.bid_token.token_info.decimals || 0
    )
    const amountError = validator(
      amountInSmallestDenomination,
      data?.minimum_bid
    )

    if (amountError) {
      setBidAmountError(amountError)
      return
    }

    setLoading(true)

    const { error: connectionError } = await connectToKeplr()

    if (connectionError) {
      setLoading(false)
      return
    }

    // place bid
    const handleMsg = {
      send: {
        recipient: data?.auction_address,
        amount: amountInSmallestDenomination,
        padding: addPadding(amountInSmallestDenomination),
      },
    }

    const { secretjs: signingClientOne } = await keplr.createSigningClient({
      maxGas: PLACE_BID_MAX_GAS,
    })

    try {
      const response = await signingClientOne?.execute(
        data?.bid_token.contract_address || '',
        handleMsg
      )
      console.log(response)
      setTxHash(response?.transactionHash)
      setSuccess(true)
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

  return (
    <StyledModal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Bid</ModalTitle>
        <Close />
      </ModalHeader>
      {!success ? (
        <Details
          endsAt={data?.ends_at}
          sellAmount={data?.sell_amount}
          minimumBidAmount={data?.minimum_bid}
          sellToken={data?.sell_token}
          bidToken={data?.bid_token}
          loading={loadingAuctionInfo}
          description={data?.description}
          label="Amount"
          value={amount}
          onChange={onChangeAmount}
          error={bidAmountError}
          bidding={loading}
          bidError={!!error}
          onSubmit={onSubmit}
        />
      ) : (
        <Success
          amount={amount}
          symbol={data?.bid_token.token_info.symbol}
          onClick={onClose}
          txHash={txHash}
        />
      )}
    </StyledModal>
  )
}

export default BidModal
