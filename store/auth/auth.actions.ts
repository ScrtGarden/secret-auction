import { action } from 'easy-peasy'

const actions = {
  setAccounts: action((state: any, payload) => {
    state.accounts = payload
  }),
  setViewingKey: action((state: any, payload) => {
    state.viewingKey = payload
  }),
}

export default actions
