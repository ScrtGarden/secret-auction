export const enum AuctionStatus {
  closed = 'closed',
  open = 'open',
}

export interface TokenInfo {
  decimals: number
  name: string
  symbol: string
  total_supply: string
}

export interface DetailedAuctionInfo {
  auction_address: string
  bid_token: {
    contract_address: string
    token_info: TokenInfo
  }
  description: string
  minimum_bid: string
  sell_amount: string
  sell_token: {
    contract_address: string
    token_info: TokenInfo
  }
  status: string
}

export interface AuctionInfo {
  address: string
  label: string
  minimum_bid: string
  pair: string
  sell_amount: string
  timestamp: number
  winning_bid: string
}
