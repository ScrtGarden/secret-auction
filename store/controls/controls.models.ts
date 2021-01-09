import { Action } from 'easy-peasy'

export interface ControlsState {
  isGetKeplrModalOpen: boolean
}

export interface ControlsActions {
  toggleGetKeplrModal: Action<ControlsModel>
}

export interface ControlsModel extends ControlsState, ControlsActions {}
