import { CombinedAuctionInfo } from '../interfaces'
import splitPair from './splitPair'

interface Filters {
  sellSymbol?: string
  bidSymbol?: string
  selectedBidSymbol?: string
  include?: string[]
  exclude?: string[]
}

const filter = (auctions: CombinedAuctionInfo[], filters: Filters) => {
  const {
    sellSymbol = '',
    bidSymbol = '',
    selectedBidSymbol,
    include = [],
    exclude = [],
  } = filters

  if (
    !sellSymbol &&
    !bidSymbol &&
    !selectedBidSymbol &&
    include.length === 0 &&
    exclude.length === 0
  ) {
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
    const includeMatch =
      include?.length > 0 ? include?.includes(bidTokenSymbol) : true
    const excludeMatch =
      exclude?.length > 0 ? !exclude?.includes(bidTokenSymbol) : true

    return (
      selectedBidSymbolMatch &&
      sellSymbolMatch &&
      bidSymbolMatch &&
      includeMatch &&
      excludeMatch
    )
  })
}

export default filter
