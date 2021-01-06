import Big from 'big.js'

const toSmallestDenomination = (amount: string, decimals: number) => {
  const parsedAmount = Big(amount)
  const multipleAmount = Big(10).pow(decimals)

  return parsedAmount.times(multipleAmount).toString()
}

export default toSmallestDenomination
