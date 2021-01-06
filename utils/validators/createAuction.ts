import { Contract } from '../../src/components/CreatePage'
import validateAddress from '../validateAddress'

type Data = {
  sell: Contract
  want: Contract
}

const validator = (data: Data) => {
  let hasError = false
  const sellErrors = {
    amount: '',
    address: '',
  }
  const forErrors = {
    amount: '',
    address: '',
  }
  const { sell, want } = data

  if (!sell.amount || parseFloat(sell.amount) <= 0) {
    sellErrors.amount = 'Invalid amount'
    hasError = true
  }
  if (!validateAddress(sell.address)) {
    sellErrors.address = 'Invalid snip-20 contract address'
    hasError = true
  }

  if (!want.amount || parseFloat(want.amount) <= 0) {
    forErrors.amount = 'Invalid amount'
    hasError = true
  }
  if (!validateAddress(want.address)) {
    forErrors.address = 'Invalid snip-20 contract address'
    hasError = true
  }

  return {
    hasError,
    sell: sellErrors,
    want: forErrors,
  }
}

export default validator
