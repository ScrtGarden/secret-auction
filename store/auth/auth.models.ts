import { Action, Computed } from 'easy-peasy'

import { StoreModel } from '..'

export interface Account {
  address: string
  algo: string
  pubkey: Uint8Array
}

export interface AuthState {
  accounts: Account[]
}

export interface AuthModel extends AuthState {
  accounts: Account[]
  setAccounts: Action<AuthModel, Account[]>
  isWalletConnected: Computed<AuthModel, boolean>
  connectedAddress: Computed<AuthModel, string>
}
