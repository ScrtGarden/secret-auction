const toBiggestDenomination = (amount: string = '0', decimals: number = 0) => {
  const parsedAmount = parseFloat(amount)

  return (parsedAmount / Math.pow(10, decimals))
    .toFixed(decimals)
    .replace(/\.?0+$/, '')
}

export default toBiggestDenomination
