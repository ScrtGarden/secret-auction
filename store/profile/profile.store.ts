import actions from './profile.actions'
import computators from './profile.computators'
import listeners from './profile.listeners'
import { ProfileModel } from './profile.models'
import state from './profile.state'

const store: ProfileModel = {
  ...state,
  ...actions,
  ...computators,
  ...listeners,
}

export default store
