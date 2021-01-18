import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'

import { ClosedAuctionInfo } from '../../../../interfaces'
import SkeletonRows from '../SkeletonRows'
import ItemRow from './ItemRow'

type Props = {
  data: readonly ClosedAuctionInfo[]
  getContracts: () => void
}

const AuctionTable: FC<Props> = (props) => {
  const { data, getContracts } = props

  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const goGetContracts = async () => {
      setFetching(true)
      await getContracts()
      setFetching(false)
    }

    goGetContracts()
  }, [])

  return (
    <Table>
      <Head>
        <HeaderRow>
          <HeaderCell>Label</HeaderCell>
          <HeaderCell>Trading</HeaderCell>
          <HeaderCell>Winning Bid</HeaderCell>
          <HeaderCell>Finalised</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows rows={4} columns={4} />
        ) : (
          data.map((item) => <ItemRow key={item.address} item={item} />)
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
