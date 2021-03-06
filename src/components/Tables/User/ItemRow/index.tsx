import { Cell, Row } from '@zendeskgarden/react-tables'
import { isPast } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { CombinedAuctionInfo } from '../../../../../interfaces'
import {
  OPEN_BIDDER_ACTIONS,
  OPEN_BIDDER_OVERDUE_ACTIONS,
  OPEN_SELLER_ACTIONS,
} from '../../../../../utils/constants'
import splitPair, { SplitPair } from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import { Pair, Symbol } from '../../styles'
import MultiButton from './MultiButton'
import Owner from './Owner'
import StatusTag from './StatusTag'
import { ButtonWrapper } from './styles'

type Props = {
  item: CombinedAuctionInfo
  onClick: (key: string, address: string) => void
}

const ItemRow: FC<Props> = (props) => {
  const { item, onClick } = props
  const {
    address,
    label,
    minimum_bid,
    sell_amount,
    pair,
    sell_decimals,
    bid_decimals,
    ends_at,
    timestamp,
    seller,
    active,
    winner,
    winning_bid,
  } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo<SplitPair>(
    () => splitPair(pair),
    [pair]
  )
  const isOverdue = useMemo<boolean>(() => isPast(new Date(ends_at * 1000)), [
    ends_at,
  ])

  let options
  if (active && !seller && isOverdue) {
    options = OPEN_BIDDER_OVERDUE_ACTIONS
  } else if (active && !seller) {
    options = OPEN_BIDDER_ACTIONS
  } else if (active && seller) {
    options = OPEN_SELLER_ACTIONS
  } else {
    options = OPEN_SELLER_ACTIONS
  }

  return (
    <Row>
      <Cell isMinimum>{seller && <Owner />}</Cell>
      <Cell>
        <Pair>
          <Symbol>{sellTokenSymbol}</Symbol>
          <Symbol bid>{`/${bidTokenSymbol}`}</Symbol>
        </Pair>
      </Cell>
      <Cell>{`${toBiggestDenomination(
        sell_amount,
        sell_decimals
      )} ${sellTokenSymbol}`}</Cell>
      <Cell>
        {minimum_bid
          ? `${toBiggestDenomination(
              minimum_bid,
              bid_decimals
            )} ${bidTokenSymbol}`
          : '-'}
      </Cell>
      <Cell>
        {winning_bid
          ? `${toBiggestDenomination(
              winning_bid,
              bid_decimals
            )} ${bidTokenSymbol}`
          : '-'}
      </Cell>
      <Cell>
        <StatusTag
          active={active}
          isOverdue={isOverdue}
          winner={winner}
          timestamp={timestamp}
          endsAt={ends_at}
        />
      </Cell>
      <Cell hasOverflow>
        <ButtonWrapper>
          <MultiButton
            disabled={!active}
            options={options}
            onClick={(key) => onClick(key, address)}
          />
        </ButtonWrapper>
      </Cell>
    </Row>
  )
}

export default memo(ItemRow)
