import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import { Contract } from '../../../../interfaces'
import ItemRow from '../ItemRow'
import SkeletonRows from './SkeletonRows'

type Props = {
  data: readonly Contract[]
  secretjs: SigningCosmWasmClient | undefined
  getContracts: () => void
  loading: boolean
}

const AuctionTable: FC<Props> = (props) => {
  const { data, secretjs, getContracts, loading } = props

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
          <HeaderCell>Actions</HeaderCell>
          <HeaderCell>Status</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {fetching ? (
          <SkeletonRows />
        ) : (
          data.map((item) => (
            <ItemRow key={item.address} item={item} secretjs={secretjs} />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
