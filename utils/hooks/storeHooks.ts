import { createTypedHooks } from 'easy-peasy';

import { StoreModel } from '../../store';

const { useStoreActions, useStoreDispatch, useStore, useStoreState } = createTypedHooks<StoreModel>();

export {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
  useStore
}
