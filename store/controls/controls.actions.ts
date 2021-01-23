import { action } from 'easy-peasy'

import { ControlsActions } from './controls.models'

const actions: ControlsActions = {
  toggleGetKeplrModal: action((state) => {
    state.isGetKeplrModalOpen = !state.isGetKeplrModalOpen
  }),
  toggleBidModal: action((state) => {
    state.isBidModalOpen = !state.isBidModalOpen
  }),
  toggleAlert: action((state) => {
    state.showAlert = !state.showAlert
  }),
  setAlertInfo: action((state, payload) => {
    state.alertInfo = payload
  }),
  toggleUpdateMinBidModal: action((state) => {
    state.isUpdateMinBidModalOpen = !state.isUpdateMinBidModalOpen
  }),
  toggleRetractBidModal: action((state) => {
    state.isRetractBidModalOpen = !state.isRetractBidModalOpen
  }),
  toggleUpdateBidModal: action((state) => {
    state.isUpdateBidModalOpen = !state.isUpdateBidModalOpen
  }),
}

export default actions
