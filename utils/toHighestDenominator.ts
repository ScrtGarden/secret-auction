const toHighestDenominator = (amount: string, decimals: number) => {
  const parsedAmount = parseFloat(amount)

  return (parsedAmount / Math.pow(10, decimals))
    .toFixed(decimals - 1)
    .replace(/\.?0+$/, '')
}

export default toHighestDenominator
