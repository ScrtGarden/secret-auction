import { ActiveAuctionInfo, CombinedAuctionInfo } from '../interfaces'
import toBiggestDenomination from './toBiggestDenomination'

export type Direction = 'asc' | 'desc' | undefined

const sortData = <T extends any[]>(
  tableData: T,
  sellSort: Direction,
  bidSort: Direction,
  dateSort: Direction
): T => {
  if (!sellSort && !bidSort && !dateSort) {
    return tableData
  }

  let field: 'sell_amount' | 'minimum_bid' | 'ends_at'
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
  } else {
    field = 'ends_at'
    sortValue = dateSort
    decimals = undefined
  }

  return tableData.sort((a, b) => {
    let aValue = 0
    let bValue = 0

    if (decimals) {
      aValue = parseFloat(
        toBiggestDenomination(a[field] as string, a[decimals])
      )
      bValue = parseFloat(
        toBiggestDenomination(b[field] as string, b[decimals])
      )
    } else {
      aValue = a[field] as number
      bValue = b[field] as number
    }

    if (aValue < bValue) {
      return sortValue === 'asc' ? 1 : -1
    } else if (aValue > bValue) {
      return sortValue === 'asc' ? -1 : 1
    }

    return 0
  })
}

export default sortData
