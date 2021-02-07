import { computed } from 'easy-peasy'

import splitPair from '../../utils/splitPair'
import { ProfileComputators } from './profile.models'

const computators: ProfileComputators = {
  filterAuctions: computed((state) => (filters) => {
    const { seller, bidder, open, closed, won, sellSymbol, bidSymbol } = filters

    if (
      !seller &&
      !bidder &&
      !open &&
      !closed &&
      !won &&
      !sellSymbol &&
      !bidSymbol
    ) {
      return state.auctions
    }

    const sellPattern = `^${sellSymbol.toUpperCase()}`
    const sellRegex = new RegExp(sellPattern)
    const bidPattern = `^${bidSymbol.toUpperCase()}`
    const bidRegex = new RegExp(bidPattern)

    return state.auctions.filter((item) => {
      const { bidTokenSymbol, sellTokenSymbol } = splitPair(item.pair)

      let typeMatch
      if (seller && bidder) {
        typeMatch = item.seller || item.bidder
      } else if (seller) {
        typeMatch = item.seller
      } else if (bidder) {
        typeMatch = item.bidder
      } else {
        typeMatch = true
      }

      let statusMatch
      if (open && closed) {
        statusMatch = true
      } else if (open) {
        statusMatch = item.active
      } else if (closed) {
        statusMatch = !item.active
      } else {
        statusMatch = true
      }

      const winnerMatch = won ? item.winner : true
      const sellSymbolMatch = sellSymbol
        ? sellTokenSymbol.match(sellRegex)
        : true
      const bidSymbolMatch = bidSymbol ? bidTokenSymbol.match(bidRegex) : true

      return (
        sellSymbolMatch &&
        bidSymbolMatch &&
        typeMatch &&
        statusMatch &&
        winnerMatch
      )
    })
  }),
  auctionById: computed((state) => (address) =>
    state.auctions.find((auction) => auction.address === address)
  ),
}

export default computators
