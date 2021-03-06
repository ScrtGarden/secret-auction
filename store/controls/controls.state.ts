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
  isUpdateMinBidModalOpen: false,
  isRetractBidModalOpen: false,
  isUpdateBidModalOpen: false,
  isFinalizeModalOpen: false,
  isImportKeyModalOpen: false,
}

export default initialState
