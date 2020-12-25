import bech32 from 'bech32'

const validateAddress = (address: string): boolean => {
  try {
    const result = bech32.decode(address)
    if (result.prefix === 'secret') {
      return true
    } else {
      false
    }
  } catch (error) {
    return false
  }
  return false
}

export default validateAddress
