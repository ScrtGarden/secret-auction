import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import { AuctionInfo, AuctionStatus } from '../../../interfaces'
import ItemRow from './ItemRow'
import SkeletonRows from './SkeletonRows'

type Props = {
  data: readonly AuctionInfo[]
  secretjs: SigningCosmWasmClient | undefined
  getContracts: () => void
  loading: boolean
  type?: AuctionStatus
}

const AuctionTable: FC<Props> = (props) => {
  const { data, secretjs, getContracts, loading, type } = props

  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const goGetContracts = async () => {
      const response = await getContracts()
      setFetching(false)
    }

    if (secretjs) {
      goGetContracts()
    }
  }, [loading])

  return (
    <Table>
      <Head>
        <HeaderRow>
          <HeaderCell>Label</HeaderCell>
          <HeaderCell>Trading</HeaderCell>
          <HeaderCell>Minimum Bid</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          {type === 'closed' && <HeaderCell>Finalised</HeaderCell>}
          {type === 'open' && <HeaderCell>Actions</HeaderCell>}
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows />
        ) : (
          data.map((item) => (
            <ItemRow
              key={item.address}
              item={item}
              secretjs={secretjs}
              type={type}
            />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
