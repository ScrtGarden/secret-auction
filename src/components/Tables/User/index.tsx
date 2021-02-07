import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { useStoreRehydrated } from 'easy-peasy'
import { useRouter } from 'next/router'
import { FC, memo, useEffect, useMemo, useState } from 'react'

import { CombinedAuctionInfo } from '../../../../interfaces'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import onClickSort from '../../../../utils/onClickSort'
import sortData, { Direction } from '../../../../utils/sortAuctions'
import NoResults from '../NoResults'
import SkeletonRows from '../SkeletonRows'
import { StyledSortableCell } from '../styles'
import ItemRow from './ItemRow'

type Props = {
  data: readonly CombinedAuctionInfo[]
  getContracts: () => void
  viewingKey?: string
}

const AuctionTable: FC<Props> = (props) => {
  const { data, getContracts, viewingKey } = props
  const router = useRouter()

  // store state
  const rehydrated = useStoreRehydrated()

  // store actions
  const toggleUpdateMinBid = useStoreActions(
    (actions) => actions.controls.toggleUpdateMinBidModal
  )
  const toggleRetractBid = useStoreActions(
    (actions) => actions.controls.toggleRetractBidModal
  )
  const toggleUpdateBid = useStoreActions(
    (actions) => actions.controls.toggleUpdateBidModal
  )
  const toggleFinalizeAuction = useStoreActions(
    (actions) => actions.controls.toggleFinalizeModal
  )

  // component state
  const [fetching, setFetching] = useState(true)
  const [sellSort, setSellSort] = useState<Direction>()
  const [bidSort, setBidSort] = useState<Direction>()
  const [dateSort, setDateSort] = useState<Direction>()

  useEffect(() => {
    const goGetContracts = async () => {
      // setFetching(true)
      await getContracts()
      setFetching(false)
    }

    if (viewingKey && rehydrated) {
      goGetContracts()
    }
  }, [viewingKey, rehydrated])

  const onClickButton = async (key: string, address: string) => {
    await router.push(
      `${router.route}?address=${address}`,
      `${router.asPath}`,
      {
        shallow: true,
      }
    )
    if (key === 'update-min-bid') {
      toggleUpdateMinBid()
    } else if (key === 'retract') {
      toggleRetractBid()
    } else if (key === 'update-bid') {
      toggleUpdateBid()
    } else if (key === 'finalize') {
      toggleFinalizeAuction()
    }
  }

  const sortedData = useMemo(
    () =>
      sortData<CombinedAuctionInfo[]>(
        data.slice(),
        sellSort,
        bidSort,
        dateSort
      ),
    [data, sellSort, bidSort, dateSort]
  )

  const onClickSellSort = () => {
    onClickSort(sellSort, setSellSort, [setBidSort, setDateSort])
  }

  const onClickBidSort = () => {
    onClickSort(bidSort, setBidSort, [setSellSort, setDateSort])
  }

  const onClickDateSort = () => {
    onClickSort(dateSort, setDateSort, [setSellSort, setBidSort])
  }

  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell width={50}></HeaderCell>
          <HeaderCell>Pair</HeaderCell>
          <StyledSortableCell sort={sellSort} onClick={onClickSellSort}>
            Sell
          </StyledSortableCell>
          <StyledSortableCell sort={bidSort} onClick={onClickBidSort}>
            Min. Price
          </StyledSortableCell>
          <HeaderCell>Winning Bid</HeaderCell>
          <StyledSortableCell sort={dateSort} onClick={onClickDateSort}>
            Status
          </StyledSortableCell>
          <HeaderCell width={130}>Action</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {fetching && <SkeletonRows rows={4} columns={7} />}
        {!fetching && sortedData.length === 0 && <NoResults colSpan={7} />}
        {!fetching &&
          sortedData.length !== 0 &&
          sortedData.map((item) => (
            <ItemRow key={item.address} item={item} onClick={onClickButton} />
          ))}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
