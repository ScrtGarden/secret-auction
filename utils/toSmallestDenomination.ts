import Big from 'big.js'

const toSmallestDenomination = (amount: string, decimals: number = 0) => {
  if (!amount) {
    return '0'
  }
  const parsedAmount = Big(amount)
  const multipleAmount = Big(10).pow(decimals)

  return parsedAmount.times(multipleAmount).toString()
}

export default toSmallestDenomination
