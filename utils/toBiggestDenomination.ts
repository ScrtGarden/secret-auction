const toBiggestDenomination = (
  amount: string = '0',
  decimals: number = 0
): string => {
  if (amount === '0' && decimals === 0) {
    return '0'
  }

  const parsedAmount = parseFloat(amount)

  return (parsedAmount / Math.pow(10, decimals))
    .toFixed(decimals)
    .replace(/\.?0+$/, '')
}

export default toBiggestDenomination
