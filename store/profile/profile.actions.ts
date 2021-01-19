import { action } from 'easy-peasy'

import { ProfileActions } from './profile.models'

const actions: ProfileActions = {
  setAuctions: action((state, payload) => {
    state.auctions = payload
  }),
  updateAuction: action((state, payload) => {
    const { address, ...rest } = payload
    state.auctions = state.auctions.map((item) =>
      item.address === address ? { ...item, ...rest } : item
    )
  }),
  removeAuction: action((state, payload) => {
    state.auctions = state.auctions.filter((item) => item.address !== payload)
  }),
}

export default actions
