import { Cell, Row } from '@zendeskgarden/react-tables'
import { format } from 'date-fns'
import { NextRouter } from 'next/router'
import { FC, memo, useMemo } from 'react'

import { ActiveAuctionInfo } from '../../../../../interfaces'
import { DATE_FORMAT } from '../../../../../utils/constants'
import { useStoreActions } from '../../../../../utils/hooks/storeHooks'
import splitPair, { SplitPair } from '../../../../../utils/splitPair'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import MultiButton from './MultiButton'

type Props = {
  item: ActiveAuctionInfo
  router: NextRouter
}

const ItemRow: FC<Props> = (props) => {
  const { item, router } = props
  const {
    address,
    label,
    minimum_bid,
    sell_amount,
    pair,
    sell_decimals,
    bid_decimals,
    ends_at,
  } = item

  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleBidModal
  )

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
        <MultiButton />
      </Cell>
    </Row>
  )
}

export default memo(ItemRow)
