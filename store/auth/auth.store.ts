import actions from './auth.actions'
import computators from './auth.computators'
import listeners from './auth.listeners'
import { AuthModel } from './auth.models'
import state from './auth.state'

const store: AuthModel = {
  ...state,
  ...actions,
  ...computators,
  ...listeners,
}

export default store
