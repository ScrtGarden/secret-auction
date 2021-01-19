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
} from '../../Common/StyledComponents'

const UpdateBidModal = () => {
  const router = useRouter()
  const { address } = router.query as BidRouterQuery

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
        <ModalTitle>Update minimum bid</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        <ModalText>{`Your current minimum bid is at ${toBiggestDenomination(
          minimum_bid,
          bid_decimals
        )} ${bidTokenSymbol}.`}</ModalText>
        <Separator lg />
        <InputWithSymbol
          label="Amount"
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

export default memo(UpdateBidModal)
