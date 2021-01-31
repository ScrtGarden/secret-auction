import { ParsedUrlQuery } from 'querystring'

export enum AuctionStatus {
  closed = 'closed',
  open = 'open',
  both = 'both',
}

export interface TokenInfo {
  decimals: number
  name: string
  symbol: string
  total_supply?: string
}

export interface TargetTokenInfo {
  contract_address: string
  token_info: TokenInfo
}

export interface DetailedAuctionInfo {
  auction_address: string
  bid_token: TargetTokenInfo
  description: string
  minimum_bid: string
  sell_amount: string
  sell_token: TargetTokenInfo
  status: string
  ends_at: string
}

export interface BaseAuctionInfo {
  address: string
  label: string
  pair: string
  sell_amount: string
  sell_decimals: number
  minimum_bid?: string
  bid_decimals?: number
}

export interface ActiveAuctionInfo extends BaseAuctionInfo {
  ends_at: number
}

export interface ClosedAuctionInfo extends BaseAuctionInfo {
  winning_bid?: string
  timestamp: number
}

export interface CombinedAuctionInfo
  extends ActiveAuctionInfo,
    ClosedAuctionInfo {
  seller?: boolean
  bidder?: boolean
  active?: boolean
  winner?: boolean
}

export interface AuctionInfoUi extends BaseAuctionInfo {
  active?: boolean
  winner?: boolean
  seller?: boolean
}

export interface ErrorResponse {
  error: {
    message: string
  }
}

export interface BidRouterQuery extends ParsedUrlQuery {
  address: string
}

export interface CreateAuctionHandleMsg {
  create_auction: {
    label: string
    sell_contract: {
      code_hash: string
      address: string
    }
    bid_contract: {
      code_hash: string
      address: string
    }
    sell_amount: string
    minimum_bid: string
    description?: string
    ends_at: number
  }
}

export interface ViewBidResponse {
  status: string
  amount: string
  decimals: number
  time_placed?: string
  message?: string
}

export interface SelectToken {
  symbol: string
  decimals: number
  address: string
}

export interface SelectTokens {
  [key: string]: SelectToken
}
