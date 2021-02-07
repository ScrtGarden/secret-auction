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

  const sellPattern = `^${sellSymbol.toUpperCase()}`
  const sellRegex = new RegExp(sellPattern)
  const bidPattern = `^${bidSymbol.toUpperCase()}`
  const bidRegex = new RegExp(bidPattern)

  return auctions.filter((item) => {
    const { bidTokenSymbol, sellTokenSymbol } = splitPair(item.pair)

    const selectedBidSymbolMatch = selectedBidSymbol
      ? selectedBidSymbol === bidTokenSymbol
      : true
    const sellSymbolMatch = sellSymbol ? sellTokenSymbol.match(sellRegex) : true
    const bidSymbolMatch = bidSymbol ? bidTokenSymbol.match(bidRegex) : true

    return selectedBidSymbolMatch && sellSymbolMatch && bidSymbolMatch
  })
}

export default filter
