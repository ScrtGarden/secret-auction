import { Skeleton } from '@zendeskgarden/react-loaders'
import { Cell, Row } from '@zendeskgarden/react-tables'
import { format } from 'date-fns'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import {
  AuctionInfoUi,
  AuctionStatus,
  DetailedAuctionInfo,
} from '../../../../interfaces'
import toHighestDenominator from '../../../../utils/toHighestDenominator'
import MultiActionButton from '../MultiActionButton'
import { StyledButton, StyledTag } from './styles'

const status = {
  closed: 'Closed',
  unfunded:
    'Accepting bids: Token(s) to be sold have NOT been consigned to the auction',
  open: 'Open',
}

type Props = {
  item: AuctionInfoUi
  secretjs: SigningCosmWasmClient | undefined
  type: AuctionStatus
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
  const { item, secretjs, type } = props
  const {
    label,
    address,
    minimum_bid,
    sell_amount,
    pair,
    timestamp,
    active,
    sell_decimals,
    winning_bid,
    bid_decimals,
  } = item

  const { bidTokenSymbol, sellTokenSymbol } = useMemo(() => {
    const pairSplit = pair.split('-')
    return {
      bidTokenSymbol: pairSplit[1],
      sellTokenSymbol: pairSplit[0],
    }
  }, [pair])

  // const [loading, setLoading] = useState(true)
  const [extraInfo, setExtraInfo] = useState<DetailedAuctionInfo>(initialState)

  // useEffect(() => {
  //   const getExtraInfo = async () => {
  //     const result = await secretjs?.queryContractSmart(address, {
  //       auction_info: {},
  //     })
  //     setExtraInfo(result.auction_info)
  //     setLoading(false)
  //   }

  //   getExtraInfo()
  // }, [])

  return (
    <Row>
      <Cell>{label}</Cell>
      <Cell>{`${toHighestDenominator(
        sell_amount,
        sell_decimals
      )} ${sellTokenSymbol}`}</Cell>
      {type === 'closed' && (
        <Cell>
          {winning_bid && bid_decimals
            ? `${toHighestDenominator(
                winning_bid,
                bid_decimals
              )} ${bidTokenSymbol}`
            : ''}
        </Cell>
      )}
      {type !== 'closed' && <Cell>{`${minimum_bid} ${bidTokenSymbol}`}</Cell>}
      <Cell>
        {/* {loading ? (
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
        )} */}
        <>
          {type === 'closed' && (
            <StyledTag hue="red" size="small">
              <span>Closed</span>
            </StyledTag>
          )}
          {(type === 'open' || active) && (
            <StyledTag hue="#5EAE91" size="small">
              <span style={{ color: 'white' }}>Open</span>
            </StyledTag>
          )}
        </>
      </Cell>
      {(type === 'closed' || type === 'both') && (
        <Cell>{timestamp ? format(timestamp * 1000, 'do MMM yyyy') : ''}</Cell>
      )}
      {(type === 'open' || type === 'both') && (
        <Cell>
          {type === 'both' ? (
            <MultiActionButton />
          ) : (
            <StyledButton>Bid</StyledButton>
          )}
        </Cell>
      )}
    </Row>
  )
}

export default memo(ItemRow)
