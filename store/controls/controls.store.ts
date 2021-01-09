import actions from './controls.actions'
import { ControlsModel } from './controls.models'
import state from './controls.state'

const store: ControlsModel = {
  ...state,
  ...actions,
}

export default store
