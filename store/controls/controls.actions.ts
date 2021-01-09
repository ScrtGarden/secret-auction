import { action } from 'easy-peasy'

import { ControlsActions } from './controls.models'

const actions: ControlsActions = {
  toggleGetKeplrModal: action((state) => {
    state.isGetKeplrModalOpen = !state.isGetKeplrModalOpen
  }),
}

export default actions
