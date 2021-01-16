const validator = (bidAmount: string, minimumBid: string): string => {
  let bidAmountError = ''
  const parsedBidAmount = parseInt(bidAmount, 10)
  const parsedMinimumBid = parseInt(minimumBid, 10)

  if (parsedBidAmount === 0) {
    bidAmountError = 'Bid cannot be 0.'
  } else if (parsedBidAmount < parsedMinimumBid) {
    bidAmountError = 'Bid must be greater or equal to minimum bid.'
  }

  return bidAmountError
}

export default validator
