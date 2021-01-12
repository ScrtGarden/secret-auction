import { Button } from '@zendeskgarden/react-buttons'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { Close } from '@zendeskgarden/react-modals'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { BidRouterQuery } from '../../../../interfaces'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import useGetAuction from '../../../../utils/hooks/useGetAuction'
import InputWithSymbol from '../../Common/InputWithSymbol'
import { Separator } from '../../Common/StyledComponents'
import Details from './Details'
import {
  EndAt,
  EndAtText,
  Header,
  StyledClock,
  StyledModal,
  Title,
  Wrapper,
} from './styles'

const BidModal = () => {
  const router = useRouter()
  const { from, address } = router.query as BidRouterQuery

  // custom hooks
  const { loading, data, error } = useGetAuction(address)

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

  console.log(loading, data, error)
  return (
    <StyledModal onClose={onClose}>
      <Header>
        <Title>Bid</Title>
        <Close />
      </Header>
      <EndAt>
        {!loading ? (
          <>
            <StyledClock name="clock" />
            <EndAtText>{data?.ends_at}</EndAtText>
          </>
        ) : (
          <Skeleton height="16px" width="200px" />
        )}
      </EndAt>
      <Wrapper>
        <Details
          sellAmount={data?.sell_amount}
          minimumBidAmount={data?.minimum_bid}
          sellToken={data?.sell_token}
          bidToken={data?.bid_token}
          loading={loading}
          description={data?.description}
        />
        <Separator lg />
        <InputWithSymbol
          label="Amount"
          value={amount}
          onChange={onChangeAmount}
          symbol={data?.bid_token.token_info.symbol}
        />
        <Separator md />
        <Button isPrimary isStretched disabled={loading || !!error}>
          Place bid
        </Button>
      </Wrapper>
    </StyledModal>
  )
}

export default BidModal
