import { Skeleton } from '@zendeskgarden/react-loaders'
import { Cell, Row } from '@zendeskgarden/react-tables'
import { FC, memo, useEffect, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import { AuctionInfo, Contract } from '../../../../interfaces'
import { StyledButton, StyledTag } from './styles'

const status = {
  closed: 'Closed',
  unfunded:
    'Accepting bids: Token(s) to be sold have NOT been consigned to the auction',
  open: 'Open',
}

type Props = {
  item: Contract
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
  const { label, address } = item

  const [loading, setLoading] = useState(true)
  const [extraInfo, setExtraInfo] = useState<AuctionInfo>(initialState)

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

  return (
    <Row>
      <Cell>{label}</Cell>
      <Cell>
        {loading ? (
          <Skeleton height="14px" width="40%" />
        ) : (
          `${extraInfo.sell_amount} ${extraInfo.sell_token.token_info.symbol}`
        )}
      </Cell>
      <Cell>
        {loading ? (
          <Skeleton height="14px" width="40%" />
        ) : (
          `${extraInfo.minimum_bid} ${extraInfo.bid_token.token_info.symbol}`
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
    </Row>
  )
}

export default memo(ItemRow)
