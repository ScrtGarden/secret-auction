import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { useRouter } from 'next/router'
import { FC, memo, useEffect, useState } from 'react'

import { ActiveAuctionInfo } from '../../../../interfaces'
import SkeletonRows from '../SkeletonRows'
import ItemRow from './ItemRow'

type Props = {
  data: readonly ActiveAuctionInfo[]
  getContracts: () => void
  viewingKey?: string
}

const AuctionTable: FC<Props> = (props) => {
  const { data, getContracts, viewingKey } = props

  const router = useRouter()
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const goGetContracts = async () => {
      setFetching(true)
      await getContracts()
      setFetching(false)
    }

    goGetContracts()
  }, [viewingKey])

  return (
    <Table>
      <Head>
        <HeaderRow>
          <HeaderCell>Label</HeaderCell>
          <HeaderCell>Trading</HeaderCell>
          <HeaderCell>Minimum</HeaderCell>
          <HeaderCell>End Date</HeaderCell>
          <HeaderCell>Action</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows rows={4} columns={4} />
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
