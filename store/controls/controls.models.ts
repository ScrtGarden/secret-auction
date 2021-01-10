import { Action } from 'easy-peasy'

export interface ControlsState {
  isGetKeplrModalOpen: boolean
  isBidModalOpen: boolean
}

export interface ControlsActions {
  toggleGetKeplrModal: Action<ControlsModel>
  toggleBidModal: Action<ControlsModel>
}

export interface ControlsModel extends ControlsState, ControlsActions {}
