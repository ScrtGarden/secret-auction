import { AlertType, ControlsState } from './controls.models'

const initialState: ControlsState = {
  isGetKeplrModalOpen: false,
  isBidModalOpen: false,
  showAlert: false,
  alertInfo: {
    title: '',
    text: '',
    type: AlertType.info,
  },
  isUpdateBidModalOpen: false,
  isRetractBidModalOpen: false,
}

export default initialState
