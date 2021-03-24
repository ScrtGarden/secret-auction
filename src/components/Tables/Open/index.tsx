import { Body, Head, HeaderCell, HeaderRow } from '@zendeskgarden/react-tables'
import { useRouter } from 'next/router'
import { FC, memo, useMemo, useState } from 'react'

import { ActiveAuctionInfo } from '../../../../interfaces'
import onClickSort from '../../../../utils/onClickSort'
import sortData, { Direction } from '../../../../utils/sortAuctions'
import NoResults from '../EmptyList/NoResults'
import SkeletonRows from '../SkeletonRows'
import { StyledSortableCell, StyledTable, TableWrapper } from '../styles'
import ItemRow from './ItemRow'

type Props = {
  data: readonly ActiveAuctionInfo[]
  loading: boolean
}

const AuctionTable: FC<Props> = (props) => {
  const { data, loading } = props
  const router = useRouter()

  // component state
  const [pairSort, setPairSort] = useState<Direction>()
  const [sellSort, setSellSort] = useState<Direction>()
  const [bidSort, setBidSort] = useState<Direction>()
  const [dateSort, setDateSort] = useState<Direction>()

  const sortedData = useMemo(
    () =>
      sortData<ActiveAuctionInfo[]>(data.slice(), {
        sellSort,
        bidSort,
        dateSort,
        pairSort,
      }),
    [data, sellSort, bidSort, dateSort, pairSort]
  )

  const onClickPairSort = () => {
    onClickSort(pairSort, setPairSort, [setSellSort, setBidSort, setDateSort])
  }

  const onClickSellSort = () => {
    onClickSort(sellSort, setSellSort, [setBidSort, setDateSort, setPairSort])
  }

  const onClickBidSort = () => {
    onClickSort(bidSort, setBidSort, [setSellSort, setDateSort, setPairSort])
  }

  const onClickDateSort = () => {
    onClickSort(dateSort, setDateSort, [setSellSort, setBidSort, setPairSort])
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
            <StyledSortableCell sort={bidSort} onClick={onClickBidSort}>
              Min. Bid
            </StyledSortableCell>

            <StyledSortableCell sort={dateSort} onClick={onClickDateSort}>
              Expected Close
            </StyledSortableCell>

            <HeaderCell width="120">Status</HeaderCell>
          </HeaderRow>
        </Head>
        <Body style={{ maxWidth: '500px' }}>
          {loading && <SkeletonRows rows={4} columns={5} />}
          {!loading && sortedData.length === 0 ? (
            <NoResults colSpan={5} />
          ) : (
            sortedData.map((item) => (
              <ItemRow key={item.address} item={item} router={router} />
            ))
          )}
        </Body>
      </StyledTable>
    </TableWrapper>
  )
}

export default memo(AuctionTable)
