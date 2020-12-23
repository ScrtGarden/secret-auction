import { action } from 'easy-peasy'

const actions = {
  setAccounts: action((state: any, payload) => {
    state.accounts = payload
  })
}

export default actions
