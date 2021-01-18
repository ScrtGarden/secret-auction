import { PersistConfig, Store, createStore, persist } from 'easy-peasy'
import { useMemo } from 'react'

import { AuthModel, AuthState } from './auth/auth.models'
import authState from './auth/auth.state'
import authStore from './auth/auth.store'
import { ControlsModel, ControlsState } from './controls/controls.models'
import controlsState from './controls/controls.state'
import controlsStore from './controls/controls.store'
import { ProfileModel, ProfileState } from './profile/profile.models'
import profileState from './profile/profile.state'
import profileStore from './profile/profile.store'

export interface StoreModel {
  auth: AuthModel
  controls: ControlsModel
  profile: ProfileModel
}

export interface StoreState {
  auth: AuthState
  controls: ControlsState
  profile: ProfileState
}

let store: Store | undefined

const initialStoreState: StoreState = {
  auth: authState,
  controls: controlsState,
  profile: profileState,
}

const storeModel: StoreModel = {
  auth: authStore,
  controls: controlsStore,
  profile: profileStore,
}

const storeConfig: PersistConfig<StoreModel> = {
  storage: 'localStorage',
  deny: ['controls'],
}

const model = persist(storeModel, storeConfig)

// add this if you want to inject store
// const getStore = () => store

const initStore = (initialState = initialStoreState) =>
  createStore(model, {
    initialState,
    name: 'MyApp',
    // injections: { getStore }, // add this if you want to inject store
  })

export const initializeStore = (preloadedState: StoreState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState: StoreState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
