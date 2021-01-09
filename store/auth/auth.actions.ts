import { action } from 'easy-peasy'

import { AuthActions } from './auth.models'

const actions: AuthActions = {
  setAccounts: action((state, payload) => {
    state.accounts = payload
  }),
  setViewingKey: action((state, payload) => {
    state.viewingKey = payload
  }),
}

export default actions
