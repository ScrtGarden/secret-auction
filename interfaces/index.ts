export interface TokenInfo {
  decimals: number
  name: string
  symbol: string
  total_supply: string
}

export interface AuctionInfo {
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

export interface Contract {
  address: string
  codeId: number
  creator: string
  label: string
}
