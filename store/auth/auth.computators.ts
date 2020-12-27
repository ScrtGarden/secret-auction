import { State, StateMapper, StateResolver, computed } from 'easy-peasy'

import { AuthModel, AuthState } from './auth.models'
import { StoreModel } from '..'

const computators = {
  isWalletConnected: computed(
    [(state: any) => state.accounts],
    (accounts) => accounts.length > 0
  ),
  connectedAddress: computed([(state: any) => state.accounts], (accounts) =>
    accounts.length > 0 ? accounts[0].address : ''
  ),
}

export default computators
