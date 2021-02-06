import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { useRouter } from 'next/router'
import { FC, memo } from 'react'

import { ActiveAuctionInfo } from '../../../../interfaces'
import SkeletonRows from '../SkeletonRows'
import ItemRow from './ItemRow'

type Props = {
  data: readonly ActiveAuctionInfo[]
  loading: boolean
}

const AuctionTable: FC<Props> = (props) => {
  const { data, loading } = props
  const router = useRouter()

  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell>Pair</HeaderCell>
          <HeaderCell>Sell</HeaderCell>
          <HeaderCell>Min. Price</HeaderCell>
          <HeaderCell>Expected Close</HeaderCell>
          <HeaderCell width="120">Status</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {loading ? (
          <SkeletonRows rows={4} columns={5} />
        ) : (
          data.map((item) => (
            <ItemRow key={item.address} item={item} router={router} />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
