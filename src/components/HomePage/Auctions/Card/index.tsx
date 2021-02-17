import { formatDistanceToNow } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { ActiveAuctionInfo } from '../../../../../interfaces'
import splitPair from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import {
  Amount,
  CloseText,
  Container,
  Details,
  Label,
  Pair,
  Symbol,
  Wrapper,
} from './styles'

type Props = {
  item: ActiveAuctionInfo
  onClick: (address: string) => void
}

const Card: FC<Props> = (props) => {
  const { item, onClick } = props
  const {
    address,
    pair,
    sell_amount,
    sell_decimals,
    bid_decimals,
    minimum_bid,
    ends_at,
  } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo(() => splitPair(pair), [
    pair,
  ])
  const formattedData = formatDistanceToNow(new Date(ends_at * 1000), {
    addSuffix: true,
  })

  return (
    <Container onClick={() => onClick(address)}>
      <Pair>
        <Symbol>{sellTokenSymbol}</Symbol>
        <Symbol bid>&nbsp;{`/ ${bidTokenSymbol}`}</Symbol>
      </Pair>
      <Details>
        <Wrapper>
          <Label>SELL</Label>
          <Amount>{`${toBiggestDenomination(
            sell_amount,
            sell_decimals
          )} `}</Amount>
        </Wrapper>
        <Wrapper>
          <Label>MIN. BID</Label>
          <Amount>{`${toBiggestDenomination(
            minimum_bid,
            bid_decimals
          )} `}</Amount>
        </Wrapper>
      </Details>
      <CloseText>{`Expected Close: ${formattedData}`}</CloseText>
    </Container>
  )
}

export default memo(Card)
