import { Skeleton } from '@zendeskgarden/react-loaders'
import { Cell, Row } from '@zendeskgarden/react-tables'
import { FC, memo } from 'react'

type Props = {
  rows: number
  columns: number
}

const SkeletonRows: FC<Props> = ({ rows = 3, columns = 3 }) => {
  const numOfRows = Array.from(Array(rows).keys())
  const numOfColumns = Array.from(Array(columns).keys())

  return (
    <>
      {numOfRows.map((row) => (
        <Row key={row}>
          {numOfColumns.map((column) => (
            <Cell key={column}>
              <Skeleton height="14px" width="40%" />
            </Cell>
          ))}
        </Row>
      ))}
    </>
  )
}

export default memo(SkeletonRows)
