const addPadding = (amount: string) => {
  const paddingLength = 40 - amount.length
  return ' '.repeat(paddingLength)
}

export default addPadding
