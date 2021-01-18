import { computed } from 'easy-peasy'

import { ProfileComputators } from './profile.models'

const computators: ProfileComputators = {
  filterAuctions: computed((state) => (filters) => {
    const { win, seller, bidder, active, search = '' } = filters

    return state.auctions.filter((item) => {
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

      const winnerMatch = win ? item.winner : true
      const activeMatch = active ? item.active : true
      const searchMatch =
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.pair.toLowerCase().includes(search.toLowerCase())

      return winnerMatch && typeMatch && activeMatch && searchMatch
    })
  }),
  auctionById: computed((state) => (address) =>
    state.auctions.find((auction) => auction.address === address)
  ),
}

export default computators
