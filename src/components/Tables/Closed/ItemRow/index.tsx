import { Cell, Row } from '@zendeskgarden/react-tables'
import { format } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { ClosedAuctionInfo } from '../../../../../interfaces'
import { DATE_FORMAT } from '../../../../../utils/constants'
import splitPair, { SplitPair } from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import { Pair, Symbol } from '../../styles'

type Props = {
  item: ClosedAuctionInfo
}

const ItemRow: FC<Props> = (props) => {
  const { item } = props
  const {
    sell_amount,
    pair,
    sell_decimals,
    bid_decimals,
    winning_bid,
    timestamp,
  } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo<SplitPair>(
    () => splitPair(pair),
    [pair]
  )

  return (
    <Row>
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
        {winning_bid
          ? `${toBiggestDenomination(
              winning_bid,
              bid_decimals
            )} ${bidTokenSymbol}`
          : '-'}
      </Cell>
      <Cell>{format(timestamp * 1000, DATE_FORMAT)}</Cell>
    </Row>
  )
}

export default memo(ItemRow)
