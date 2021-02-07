import { Dispatch, SetStateAction } from 'react'

import { Direction } from './sortAuctions'

const onClickSort = (
  targetSort: Direction,
  targetSetSort: Dispatch<SetStateAction<Direction>>,
  restSetSort: Dispatch<SetStateAction<Direction>>[]
) => {
  if (targetSort === 'asc') {
    targetSetSort('desc')
  } else if (targetSort === 'desc') {
    targetSetSort(undefined)
  } else {
    targetSetSort('asc')
  }
  restSetSort.forEach((setSort: Dispatch<SetStateAction<Direction>>) => {
    setSort(undefined)
  })
}

export default onClickSort
