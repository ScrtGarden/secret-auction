import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import { AuctionInfoUi, AuctionStatus } from '../../../interfaces'
import ItemRow from './ItemRow'
import SkeletonRows from './SkeletonRows'

type Props = {
  data: readonly AuctionInfoUi[]
  secretjs: SigningCosmWasmClient | undefined
  getContracts: () => void
  loading: boolean
  type: AuctionStatus
}

const AuctionTable: FC<Props> = (props) => {
  const { data, secretjs, getContracts, loading, type } = props

  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const goGetContracts = async () => {
      setFetching(true)
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
          {(type === 'closed' || type === 'both') && (
            <HeaderCell>Finalised</HeaderCell>
          )}
          {(type === 'open' || type === 'both') && (
            <HeaderCell>Actions</HeaderCell>
          )}
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows rows={4} columns={type === 'both' ? 6 : 5} />
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
