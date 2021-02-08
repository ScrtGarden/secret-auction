import toBiggestDenomination from './toBiggestDenomination'

export type Direction = 'asc' | 'desc' | undefined

interface Sortables {
  sellSort?: Direction
  bidSort?: Direction
  dateSort?: Direction
  pairSort?: Direction
  winBidSort?: Direction
  finalizeSort?: Direction
}

const sortData = <T extends any[]>(
  tableData: T,
  sortables: Sortables = {}
): T => {
  const {
    sellSort,
    bidSort,
    dateSort,
    pairSort,
    winBidSort,
    finalizeSort,
  } = sortables

  if (
    !sellSort &&
    !bidSort &&
    !dateSort &&
    !pairSort &&
    !winBidSort &&
    !finalizeSort
  ) {
    return tableData
  }

  let field:
    | 'sell_amount'
    | 'minimum_bid'
    | 'ends_at'
    | 'pair'
    | 'winning_bid'
    | 'timestamp'
  let sortValue: Direction
  let decimals: 'sell_decimals' | 'bid_decimals' | undefined

  if (sellSort) {
    field = 'sell_amount'
    sortValue = sellSort
    decimals = 'sell_decimals'
  } else if (bidSort) {
    field = 'minimum_bid'
    sortValue = bidSort
    decimals = 'bid_decimals'
  } else if (dateSort) {
    field = 'ends_at'
    sortValue = dateSort
  } else if (pairSort) {
    field = 'pair'
    sortValue = pairSort
  } else if (winBidSort) {
    field = 'winning_bid'
    sortValue = winBidSort
    decimals = 'bid_decimals'
  } else {
    field = 'timestamp'
    sortValue = finalizeSort
  }

  return tableData.sort((a, b) => {
    let aValue
    let bValue

    if (decimals) {
      aValue = parseFloat(
        toBiggestDenomination(a[field] as string, a[decimals])
      )
      bValue = parseFloat(
        toBiggestDenomination(b[field] as string, b[decimals])
      )
    } else {
      aValue = a[field] as number | string
      bValue = b[field] as number | string
    }

    if (pairSort ? aValue > bValue : aValue < bValue) {
      return sortValue === 'asc' ? 1 : -1
    } else if (pairSort ? aValue < bValue : aValue > bValue) {
      return sortValue === 'asc' ? -1 : 1
    }

    return 0
  })
}

export default sortData
