import { Action, Computed } from 'easy-peasy'

import { StoreModel } from '..'

export interface Account {
  address: string
  algo: string
  pubkey: Uint8Array
}

export interface AuthState {
  accounts: Account[]
  viewingKey: string
}

export interface AuthModel extends AuthState {
  setAccounts: Action<AuthModel, Account[]>
  setViewingKey: Action<AuthModel, string>
  isWalletConnected: Computed<AuthModel, boolean>
  connectedAddress: Computed<AuthModel, string>
}
