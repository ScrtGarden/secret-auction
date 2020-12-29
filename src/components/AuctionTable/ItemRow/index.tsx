import { Skeleton } from '@zendeskgarden/react-loaders'
import { Cell, Row } from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import { AuctionInfo, DetailedAuctionInfo } from '../../../../interfaces'
import { StyledButton, StyledTag } from './styles'

const status = {
  closed: 'Closed',
  unfunded:
    'Accepting bids: Token(s) to be sold have NOT been consigned to the auction',
  open: 'Open',
}

type Props = {
  item: AuctionInfo
  secretjs: SigningCosmWasmClient | undefined
}

const initialState = {
  sell_token: {
    contract_address: '',
    token_info: {
      symbol: '',
      decimals: 0,
      name: '',
      total_supply: '',
    },
  },
  bid_token: {
    contract_address: '',
    token_info: {
      symbol: '',
      decimals: 0,
      name: '',
      total_supply: '',
    },
  },
  sell_amount: '',
  minimum_bid: '',
  status: '',
  description: '',
  auction_address: '',
}

const ItemRow: FC<Props> = (props) => {
  const { item, secretjs } = props
  const { label, address, minimum_bid, sell_amount, pair } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo(() => {
    const pairSplit = pair.split('-')
    return {
      bidTokenSymbol: pairSplit[1],
      sellTokenSymbol: pairSplit[0],
    }
  }, [pair])

  const [loading, setLoading] = useState(true)
  const [extraInfo, setExtraInfo] = useState<DetailedAuctionInfo>(initialState)

  useEffect(() => {
    const getExtraInfo = async () => {
      const result = await secretjs?.queryContractSmart(address, {
        auction_info: {},
      })
      setExtraInfo(result.auction_info)
      setLoading(false)
    }

    getExtraInfo()
  }, [])
  console.log(extraInfo)
  return (
    <Row>
      <Cell>{label}</Cell>
      <Cell>{`${sell_amount} ${sellTokenSymbol}`}</Cell>
      <Cell>{`${minimum_bid} ${bidTokenSymbol}`}</Cell>
      <Cell>
        {loading ? (
          <Skeleton height="14px" width="20%" />
        ) : (
          <>
            {extraInfo.status === status.closed && (
              <StyledTag hue="red" size="small">
                <span>Closed</span>
              </StyledTag>
            )}
            {extraInfo.status !== status.closed && (
              <StyledTag hue="#5EAE91" size="small">
                <span style={{ color: 'white' }}>Open</span>
              </StyledTag>
            )}
            {extraInfo.status === status.unfunded && (
              <StyledTag hue="warningHue" size="small">
                <span style={{ color: 'white' }}>Unfunded</span>
              </StyledTag>
            )}
          </>
        )}
      </Cell>
      <Cell>
        {loading ? (
          <Skeleton height="14px" width="20%" />
        ) : (
          <StyledButton size="small" disabled={extraInfo.status === 'Closed'}>
            Bid
          </StyledButton>
        )}
      </Cell>
    </Row>
  )
}

export default memo(ItemRow)
