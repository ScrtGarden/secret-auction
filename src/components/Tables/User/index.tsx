import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { useStoreRehydrated } from 'easy-peasy'
import { useRouter } from 'next/router'
import { FC, memo, useEffect, useState } from 'react'

import { CombinedAuctionInfo } from '../../../../interfaces'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import SkeletonRows from '../SkeletonRows'
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
  const toggleUpdateBid = useStoreActions(
    (actions) => actions.controls.toggleUpdateBidModal
  )
  const toggleRetractBid = useStoreActions(
    (actions) => actions.controls.toggleRetractBidModal
  )

  // component state
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const goGetContracts = async () => {
      setFetching(true)
      await getContracts()
      setFetching(false)
    }

    if (rehydrated) {
      goGetContracts()
    }
  }, [viewingKey, rehydrated])

  const onClickButton = (key: string, address: string) => {
    if (key === 'edit') {
      router.push(`${router.route}?address=${address}`, `${router.asPath}`, {
        shallow: true,
      })
      toggleUpdateBid()
    } else if (key === 'retract') {
      router.push(`${router.route}?address=${address}`, `${router.asPath}`, {
        shallow: true,
      })
      toggleRetractBid()
    }
    // console.log(key)
  }

  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell width={50}></HeaderCell>
          <HeaderCell>Label</HeaderCell>
          <HeaderCell>Trading</HeaderCell>
          <HeaderCell>Minimum</HeaderCell>
          <HeaderCell>End Date</HeaderCell>
          <HeaderCell>Winning Bid</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell width={130}>Action</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows rows={4} columns={8} />
        ) : (
          data.map((item) => (
            <ItemRow key={item.address} item={item} onClick={onClickButton} />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
