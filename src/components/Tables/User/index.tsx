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
import ErrorKey from '../EmptyList/ErrorKey'
import NoKey from '../EmptyList/NoKey'
import NoResults from '../EmptyList/NoResults'
import SkeletonRows from '../SkeletonRows'
import { StyledSortableCell, StyledTable, TableWrapper } from '../styles'
import ItemRow from './ItemRow'

type Props = {
  data: readonly CombinedAuctionInfo[]
  getContracts: () => Promise<{ error?: {}; data?: {} }>
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
  const [pairSort, setPairSort] = useState<Direction>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const goGetContracts = async () => {
      setFetching(true)
      const response = await getContracts()
      if (response.error) {
        setError(true)
      } else {
        setError(false)
      }
      setFetching(false)
    }

    if (viewingKey && rehydrated) {
      goGetContracts()
    } else {
      setFetching(false)
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
      sortData<CombinedAuctionInfo[]>(data.slice(), {
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
            <HeaderCell width={50}></HeaderCell>
            <StyledSortableCell sort={pairSort} onClick={onClickPairSort}>
              Pair
            </StyledSortableCell>
            <StyledSortableCell sort={sellSort} onClick={onClickSellSort}>
              Sell
            </StyledSortableCell>
            <StyledSortableCell sort={bidSort} onClick={onClickBidSort}>
              Min. Bid
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
          {!fetching && !viewingKey && <NoKey colSpan={7} />}
          {!fetching && viewingKey && error && <ErrorKey colSpan={7} />}
          {!fetching && viewingKey && !error && sortedData.length === 0 && (
            <NoResults colSpan={7} />
          )}
          {!fetching &&
            viewingKey &&
            !error &&
            sortedData.length !== 0 &&
            sortedData.map((item) => (
              <ItemRow key={item.address} item={item} onClick={onClickButton} />
            ))}
        </Body>
      </StyledTable>
    </TableWrapper>
  )
}

export default memo(AuctionTable)
