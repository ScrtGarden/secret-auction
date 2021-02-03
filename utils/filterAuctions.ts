import { CombinedAuctionInfo } from '../interfaces'
import splitPair from './splitPair'

interface Filters {
  search?: string
  sellSymbol?: string
  bidSymbol?: string
}

const filter = (auctions: CombinedAuctionInfo[], filters: Filters) => {
  const { search = '', sellSymbol = '', bidSymbol = '' } = filters

  return auctions.filter((item) => {
    const { bidTokenSymbol, sellTokenSymbol } = splitPair(item.pair)
    const searchMatch =
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.pair.toLowerCase().includes(search.toLowerCase())
    const sellSymbolMatch = sellTokenSymbol
      ? sellTokenSymbol.includes(sellSymbol)
      : true
    const bidSymbolMatch = bidTokenSymbol
      ? bidTokenSymbol.includes(bidSymbol)
      : true

    return searchMatch && sellSymbolMatch && bidSymbolMatch
  })
}

export default filter
