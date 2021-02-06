import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { useRouter } from 'next/router'
import { FC, memo, useMemo, useState } from 'react'

import { ActiveAuctionInfo } from '../../../../interfaces'
import sortData from '../../../../utils/sortAuctions'
import NoResults from '../NoResults'
import SkeletonRows from '../SkeletonRows'
import { StyledSortableCell } from '../styles'
import ItemRow from './ItemRow'

type Direction = 'asc' | 'desc' | undefined

type Props = {
  data: readonly ActiveAuctionInfo[]
  loading: boolean
}

const AuctionTable: FC<Props> = (props) => {
  const { data, loading } = props
  const router = useRouter()

  // component state
  const [sellSort, setSellSort] = useState<Direction>()
  const [bidSort, setBidSort] = useState<Direction>()
  const [dateSort, setDateSort] = useState<Direction>()

  const sortedData = useMemo(
    () => sortData(data.slice(), sellSort, bidSort, dateSort),
    [data, sellSort, bidSort, dateSort]
  )

  const onClickSellSort = () => {
    if (sellSort === 'asc') {
      setSellSort('desc')
    } else if (sellSort === 'desc') {
      setSellSort(undefined)
    } else {
      setSellSort('asc')
    }
    setBidSort(undefined)
    setDateSort(undefined)
  }

  const onClickBidSort = () => {
    if (bidSort === 'asc') {
      setBidSort('desc')
    } else if (bidSort === 'desc') {
      setBidSort(undefined)
    } else {
      setBidSort('asc')
    }
    setSellSort(undefined)
    setDateSort(undefined)
  }

  const onClickDateSort = () => {
    if (dateSort === 'asc') {
      setDateSort('desc')
    } else if (dateSort === 'desc') {
      setDateSort(undefined)
    } else {
      setDateSort('asc')
    }
    setSellSort(undefined)
    setBidSort(undefined)
  }

  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell>Pair</HeaderCell>
          <StyledSortableCell sort={sellSort} onClick={onClickSellSort}>
            Sell
          </StyledSortableCell>
          <StyledSortableCell sort={bidSort} onClick={onClickBidSort}>
            Min. Price
          </StyledSortableCell>
          <StyledSortableCell sort={dateSort} onClick={onClickDateSort}>
            Expected Close
          </StyledSortableCell>
          <HeaderCell width="120">Status</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {loading && <SkeletonRows rows={4} columns={5} />}
        {!loading && sortedData.length === 0 ? (
          <NoResults colSpan={5} />
        ) : (
          sortedData.map((item) => (
            <ItemRow key={item.address} item={item} router={router} />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
