import { Body, Head, HeaderRow } from '@zendeskgarden/react-tables'
import { memo, useMemo, useState } from 'react'

import { ClosedAuctionInfo } from '../../../../interfaces'
import useGetAuctions from '../../../../utils/hooks/useGetAuctions'
import onClickSort from '../../../../utils/onClickSort'
import sortData, { Direction } from '../../../../utils/sortAuctions'
import SkeletonRows from '../SkeletonRows'
import { StyledSortableCell, StyledTable, TableWrapper } from '../styles'
import ItemRow from './ItemRow'

const AuctionTable = () => {
  // custom hook
  const { auctions, loading } = useGetAuctions({ list_closed_auctions: {} })

  // component state
  const [pairSort, setPairSort] = useState<Direction>()
  const [sellSort, setSellSort] = useState<Direction>()
  const [winBidSort, setWinBidSort] = useState<Direction>()
  const [dateSort, setDateSort] = useState<Direction>()

  const sortedData = useMemo(
    () =>
      sortData<ClosedAuctionInfo[]>(auctions.slice(), {
        sellSort,
        winBidSort,
        finalizeSort: dateSort,
        pairSort,
      }),
    [auctions, sellSort, winBidSort, dateSort, pairSort]
  )

  const onClickPairSort = () => {
    onClickSort(pairSort, setPairSort, [
      setSellSort,
      setWinBidSort,
      setDateSort,
    ])
  }

  const onClickSellSort = () => {
    onClickSort(sellSort, setSellSort, [
      setWinBidSort,
      setDateSort,
      setPairSort,
    ])
  }

  const onClickWinBidSort = () => {
    onClickSort(winBidSort, setWinBidSort, [
      setSellSort,
      setDateSort,
      setPairSort,
    ])
  }

  const onClickDateSort = () => {
    onClickSort(dateSort, setDateSort, [
      setSellSort,
      setWinBidSort,
      setPairSort,
    ])
  }

  return (
    <TableWrapper>
      <StyledTable size="large">
        <Head>
          <HeaderRow>
            <StyledSortableCell sort={pairSort} onClick={onClickPairSort}>
              Pair
            </StyledSortableCell>
            <StyledSortableCell sort={sellSort} onClick={onClickSellSort}>
              Sell
            </StyledSortableCell>
            <StyledSortableCell sort={winBidSort} onClick={onClickWinBidSort}>
              Winning Bid
            </StyledSortableCell>
            <StyledSortableCell sort={dateSort} onClick={onClickDateSort}>
              Finalized
            </StyledSortableCell>
          </HeaderRow>
        </Head>
        <Body>
          {loading ? (
            <SkeletonRows rows={4} columns={4} />
          ) : (
            sortedData.map((item: ClosedAuctionInfo) => (
              <ItemRow key={item.address} item={item} />
            ))
          )}
        </Body>
      </StyledTable>
    </TableWrapper>
  )
}

export default memo(AuctionTable)
