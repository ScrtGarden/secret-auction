import { Cell, Row } from '@zendeskgarden/react-tables'
import { format } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { ActiveAuctionInfo } from '../../../../../interfaces'
import { DATE_FORMAT } from '../../../../../utils/constants'
import splitPair, { SplitPair } from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import { StyledButton } from './styles'

type Props = {
  item: ActiveAuctionInfo
}

const ItemRow: FC<Props> = (props) => {
  const { item } = props
  const {
    label,
    minimum_bid,
    sell_amount,
    pair,
    sell_decimals,
    bid_decimals,
    ends_at,
  } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo<SplitPair>(
    () => splitPair(pair),
    [pair]
  )

  return (
    <Row>
      <Cell>{label}</Cell>
      <Cell>{`${toBiggestDenomination(
        sell_amount,
        sell_decimals
      )} ${sellTokenSymbol}`}</Cell>
      <Cell>
        {`${toBiggestDenomination(
          minimum_bid,
          bid_decimals
        )} ${bidTokenSymbol}`}
      </Cell>
      <Cell>{format(ends_at * 1000, DATE_FORMAT)}</Cell>
      <Cell>
        <StyledButton>Bid</StyledButton>
      </Cell>
    </Row>
  )
}

export default memo(ItemRow)
