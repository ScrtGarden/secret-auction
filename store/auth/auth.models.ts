import { Action, Computed } from 'easy-peasy'

export interface Account {
  address: string
  algo: string
  pubkey: Uint8Array
}

interface ViewingKeys {
  [address: string]: string
}

export interface AuthState {
  accounts: Account[]
  viewingKeys: ViewingKeys
}

export interface AuthActions {
  setAccounts: Action<AuthModel, Account[]>
  setViewingKey: Action<AuthModel, string>
}

export interface AuthComputators {
  isWalletConnected: Computed<AuthModel, boolean>
  connectedAddress: Computed<AuthModel, string>
  connectedViewingKey: Computed<AuthModel, string>
}

export interface AuthModel extends AuthState, AuthActions, AuthComputators {}
