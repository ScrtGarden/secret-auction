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
  connectedViewingKey: computed(
    [(state) => state.viewingKeys, (state) => state.connectedAddress],
    (viewingKeys, address) => viewingKeys[address]
  ),
}

export default computators
