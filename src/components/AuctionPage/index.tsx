import { useRouter } from 'next/router'

import { BidRouterQuery } from '../../../interfaces'
import useGetAuction from '../../../utils/hooks/useGetAuction'
import { Container, InnerContainer } from '../Common/StyledComponents'
import Bid from './Bid'
import Header from './Header'
import { Cards, Content } from './styles'
import TokenCard from './TokenCard'

const AuctionPage = () => {
  const router = useRouter()
  const { address = '' } = router.query as BidRouterQuery

  // custom hooks
  const { loading, data, error } = useGetAuction(address)

  const { bid_token, sell_token, ends_at, sell_amount, minimum_bid } =
    data || {}

  return (
    <Container>
      <InnerContainer>
        <Header
          loading={loading}
          sellSymbol={sell_token?.token_info.symbol}
          bidSymbol={bid_token?.token_info.symbol}
          address={address}
          endDate={ends_at}
        />
        <Content>
          <Cards>
            <TokenCard
              loading={loading}
              title="Sell Token"
              tokenData={sell_token}
              amount={sell_amount}
              amountLabel="Amount"
              warning
            />
            <TokenCard
              loading={loading}
              title="Bid Token"
              tokenData={bid_token}
              amount={minimum_bid}
              amountLabel="Minimum Bid"
            />
          </Cards>
          <Bid
            auctionAddress={address}
            loading={loading}
            sellAmount={sell_amount}
            sellDecimals={sell_token?.token_info.decimals}
            sellSymbol={sell_token?.token_info.symbol}
            bidData={bid_token}
            minimumBid={minimum_bid}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default AuctionPage
