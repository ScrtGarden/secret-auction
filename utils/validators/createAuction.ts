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
    codeHash: '',
  }
  const forErrors = {
    amount: '',
    address: '',
    codeHash: '',
  }
  const { sell, want } = data

  if (!sell.amount || parseFloat(sell.amount) <= 0) {
    sellErrors.amount = 'Invalid amount.'
    hasError = true
  }
  if (!validateAddress(sell.address)) {
    sellErrors.address = 'Invalid address.'
    hasError = true
  }
  if (!sell.codeHash) {
    sellErrors.codeHash = 'Invalid code hash.'
    hasError = true
  }

  if (!want.amount || parseFloat(want.amount) <= 0) {
    forErrors.amount = 'Invalid amount.'
    hasError = true
  }
  if (!validateAddress(want.address)) {
    forErrors.address = 'Invalid address.'
    hasError = true
  }
  if (!want.codeHash) {
    forErrors.codeHash = 'Invalid code hash.'
    hasError = true
  }

  return {
    hasError,
    sell: sellErrors,
    want: forErrors,
  }
}

export default validator
