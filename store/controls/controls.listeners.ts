import { actionOn } from 'easy-peasy'

import { AlertType, ControlsListeners } from './controls.models'

const listeners: ControlsListeners = {
  onToggleAlert: actionOn(
    (actions) => actions.toggleAlert,
    (state, target) => {
      if (!state.showAlert) {
        state.alertInfo = {
          title: '',
          text: '',
          type: AlertType.info,
        }
      }
    }
  ),
  onSetAlertInfo: actionOn(
    (actions) => actions.setAlertInfo,
    (state) => {
      if (state.alertInfo.title) {
        state.showAlert = true
      }
    }
  ),
}

export default listeners
