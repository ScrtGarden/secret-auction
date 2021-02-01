const validator = (date: Date, amount: string) => {
  let hasErrors
  let dateError = ''
  let amountError = ''

  if (!date) {
    dateError = 'Invalid date.'
    hasErrors = true
  }

  if (!amount) {
    amountError = 'Invalid minimum bid.'
    hasErrors = true
  }

  return {
    hasErrors,
    date: dateError,
    amount: amountError,
  }
}

export default validator
