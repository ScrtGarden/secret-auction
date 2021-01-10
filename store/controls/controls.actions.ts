import { action } from 'easy-peasy'

import { ControlsActions } from './controls.models'

const actions: ControlsActions = {
  toggleGetKeplrModal: action((state) => {
    state.isGetKeplrModalOpen = !state.isGetKeplrModalOpen
  }),
  toggleBidModal: action((state) => {
    state.isBidModalOpen = !state.isBidModalOpen
  }),
}

export default actions
