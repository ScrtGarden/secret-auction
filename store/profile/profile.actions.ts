import { action } from 'easy-peasy'

import { ProfileActions } from './profile.models'

const actions: ProfileActions = {
  setAuctions: action((state, payload) => {
    state.auctions = payload
  }),
}

export default actions
