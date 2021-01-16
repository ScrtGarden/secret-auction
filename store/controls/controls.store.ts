import actions from './controls.actions'
import listeners from './controls.listeners'
import { ControlsModel } from './controls.models'
import state from './controls.state'

const store: ControlsModel = {
  ...state,
  ...actions,
  ...listeners,
}

export default store
