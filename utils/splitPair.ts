export interface SplitPair {
  sellTokenSymbol: string
  bidTokenSymbol: string
}

const splitPair = (pair: string = ''): SplitPair => {
  const arr = pair.split('-')

  return {
    sellTokenSymbol: arr[0],
    bidTokenSymbol: arr[1],
  }
}

export default splitPair
