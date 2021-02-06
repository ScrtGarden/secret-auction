import { CombinedAuctionInfo } from '../interfaces'
import splitPair from './splitPair'

interface Filters {
  sellSymbol?: string
  bidSymbol?: string
  selectedBidSymbol?: string
}

const filter = (auctions: CombinedAuctionInfo[], filters: Filters) => {
  const { sellSymbol = '', bidSymbol = '', selectedBidSymbol } = filters

  if (!sellSymbol && !bidSymbol && !selectedBidSymbol) {
    return auctions
  }

  return auctions.filter((item) => {
    const { bidTokenSymbol, sellTokenSymbol } = splitPair(item.pair)

    const selectedBidSymbolMatch = selectedBidSymbol
      ? selectedBidSymbol === bidTokenSymbol
      : true
    const sellSymbolMatch = sellSymbol
      ? sellTokenSymbol.includes(sellSymbol.toUpperCase())
      : true
    const bidSymbolMatch = bidSymbol
      ? bidTokenSymbol.includes(bidSymbol.toUpperCase())
      : true

    return selectedBidSymbolMatch && sellSymbolMatch && bidSymbolMatch
  })
}

export default filter
