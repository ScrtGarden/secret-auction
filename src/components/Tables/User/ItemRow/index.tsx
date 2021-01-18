import { Cell, Row } from '@zendeskgarden/react-tables'
import { Tag } from '@zendeskgarden/react-tags'
import { format, isPast } from 'date-fns'
import { NextRouter } from 'next/router'
import { FC, memo, useMemo } from 'react'

import { CombinedAuctionInfo } from '../../../../../interfaces'
import {
  DATE_FORMAT,
  OPEN_BIDDER_ACTIONS,
  OPEN_BIDDER_OVERDUE_ACTIONS,
  OPEN_SELLER_ACTIONS,
} from '../../../../../utils/constants'
import splitPair, { SplitPair } from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import MultiButton from './MultiButton'
import { StyledTag } from './styles'

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
      <Cell>{timestamp ? format(timestamp * 1000, DATE_FORMAT) : '-'}</Cell>
      <Cell>
        {' '}
        {winning_bid
          ? `${toBiggestDenomination(
              winning_bid,
              bid_decimals
            )} ${bidTokenSymbol}`
          : '-'}
      </Cell>
      <Cell>
        {active && isOverdue && (
          <Tag hue="#f79a3e">
            <span>Overdue</span>
          </Tag>
        )}
        {active && !isOverdue && (
          <Tag hue="mint">
            <span>Open</span>
          </Tag>
        )}
        {!active && !winner && (
          <Tag hue="red">
            <span>Closed</span>
          </Tag>
        )}
        {!active && winner && (
          <Tag hue="lemon">
            <span>Winner</span>
          </Tag>
        )}
        {seller && (
          <StyledTag hue="kale">
            <span>Owner</span>
          </StyledTag>
        )}
      </Cell>
      <Cell hasOverflow>
        <MultiButton
          options={options}
          onClick={(key) => onClick(key, address)}
        />
      </Cell>
    </Row>
  )
}

export default memo(ItemRow)
