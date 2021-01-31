import { SelectToken } from '../../interfaces'
import { TargetTokenData } from '../../src/components/CreatePage'
import validateAddress from '../validateAddress'

interface TokenData extends TargetTokenData, SelectToken {}

interface Data {
  sell: TokenData
  bid: TokenData
  date: Date
}

export interface TokenError {
  amount: string
  address: string
}

export interface Result {
  hasError?: boolean
  sell: TokenError
  bid: TokenError
  date: string
}

const validator = (data: Data): Result => {
  let hasError = false
  const sellErrors = {
    amount: '',
    address: '',
  }
  const bidErrors = {
    amount: '',
    address: '',
  }
  let dateError = ''
  const { sell, bid, date } = data

  if (!sell.amount || parseFloat(sell.amount) <= 0) {
    sellErrors.amount = 'Invalid amount.'
    hasError = true
  }
  if (!validateAddress(sell.address)) {
    sellErrors.address = 'Invalid token contract address.'
    hasError = true
  }

  if (!bid.amount || parseFloat(bid.amount) < 0) {
    bidErrors.amount = 'Invalid amount.'
    hasError = true
  }
  if (!validateAddress(bid.address)) {
    bidErrors.address = 'Invalid token contract address.'
    hasError = true
  }

  if (sell.address === bid.address) {
    sellErrors.amount = 'Cannot sell and ask for the same token.'
    bidErrors.amount = 'Cannot sell and ask for the same token.'
    hasError = true
  }

  if (!date) {
    dateError = 'Invalid date.'
    hasError = true
  }

  return {
    hasError,
    sell: sellErrors,
    bid: bidErrors,
    date: dateError,
  }
}

export default validator
