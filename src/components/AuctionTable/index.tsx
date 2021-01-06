import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
} from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'

import { AuctionInfoUi, AuctionStatus } from '../../../interfaces'
import ItemRow from './ItemRow'
import SkeletonRows from './SkeletonRows'

type Props = {
  data: readonly AuctionInfoUi[]
  getContracts: () => void
  type: AuctionStatus
}

const AuctionTable: FC<Props> = (props) => {
  const { data, getContracts, type } = props

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
          <HeaderCell>
            {type === 'closed' ? 'Winning' : 'Minimum'} bid
          </HeaderCell>
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
            <ItemRow key={item.address} item={item} type={type} />
          ))
        )}
      </Body>
    </Table>
  )
}

export default memo(AuctionTable)
