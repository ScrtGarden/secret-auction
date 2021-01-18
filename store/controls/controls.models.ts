import { Action, ActionOn } from 'easy-peasy'

export enum AlertType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}

interface AlertInfo {
  title: string
  text: string
  type: AlertType
}

export interface ControlsState {
  isGetKeplrModalOpen: boolean
  isBidModalOpen: boolean
  showAlert: boolean
  alertInfo: AlertInfo
  isUpdateBidModalOpen: boolean
}

export interface ControlsActions {
  toggleGetKeplrModal: Action<ControlsModel>
  toggleBidModal: Action<ControlsModel>
  toggleAlert: Action<ControlsModel>
  setAlertInfo: Action<ControlsModel, AlertInfo>
  toggleUpdateBidModal: Action<ControlsModel>
}

export interface ControlsListeners {
  onToggleAlert: ActionOn<ControlsModel>
  onSetAlertInfo: ActionOn<ControlsModel>
}

export interface ControlsModel
  extends ControlsState,
    ControlsActions,
    ControlsListeners {}
