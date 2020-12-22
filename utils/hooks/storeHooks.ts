import { createTypedHooks } from 'easy-peasy';

import { StoreModel, StoreState } from '../../store';

const { useStoreActions, useStoreDispatch, useStore } = createTypedHooks<StoreModel>();
const  { useStoreState } = createTypedHooks<StoreState>()

export {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
  useStore
}
