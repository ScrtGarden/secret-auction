import { computed } from 'easy-peasy'

import { AuthComputators } from './auth.models'

const computators: AuthComputators = {
  isWalletConnected: computed(
    [(state) => state.accounts],
    (accounts) => accounts.length > 0
  ),
  connectedAddress: computed([(state) => state.accounts], (accounts) =>
    accounts.length > 0 ? accounts[0].address : ''
  ),
}

export default computators
