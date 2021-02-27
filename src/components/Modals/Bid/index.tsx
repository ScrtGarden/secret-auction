import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import useGetAuction from '../../../../utils/hooks/useGetAuction'
import usePlaceBid from '../../../../utils/hooks/usePlaceBid'
import {
  ModalHeader,
  ModalTitle,
  StyledModal,
} from '../../Common/StyledComponents'
import SuccessBid from '../../SuccessBid'
import Details from './Details'
import { SuccessBidWrapper } from './styles'

const BidModal = () => {
  const router = useRouter()
  const { from, address } = router.query as BidRouterQuery

  // custom hooks
  const { loading: loadingAuctionInfo, data, error } = useGetAuction(address)
  const { error: placeBidError, loading, placeBid, txHash } = usePlaceBid()

  // store actions
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleBidModal
  )

  // component state
  const [amount, setAmount] = useState('')

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
    await placeBid({
      amount,
      minimumBid: data?.minimum_bid || '',
      auctionAddress: address,
      tokenAddress: data?.bid_token.contract_address || '',
      decimals: data?.bid_token.token_info.decimals || 0,
    })
  }

  return (
    <StyledModal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Bid</ModalTitle>
        <Close />
      </ModalHeader>
      {!txHash ? (
        <Details
          endsAt={data?.ends_at}
          sellAmount={data?.sell_amount}
          minimumBidAmount={data?.minimum_bid}
          sellToken={data?.sell_token}
          bidToken={data?.bid_token}
          loadingData={loadingAuctionInfo}
          description={data?.description}
          label="Amount"
          value={amount}
          onChange={onChangeAmount}
          error={placeBidError}
          bidding={loading}
          bidError={!!error}
          onSubmit={onSubmit}
          loading={loading}
        />
      ) : (
        <SuccessBidWrapper>
          <SuccessBid
            amount={amount}
            symbol={data?.bid_token.token_info.symbol}
            onClick={onClose}
            txHash={txHash}
          />
        </SuccessBidWrapper>
      )}
    </StyledModal>
  )
}

export default BidModal
