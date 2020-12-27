import { Skeleton } from '@zendeskgarden/react-loaders'
import { Cell, Row } from '@zendeskgarden/react-tables'
import { memo } from 'react'

const SkeletonRows = () => {
  return (
    <>
      <Row>
        <Cell>
          <Skeleton height="14px" width="50%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Skeleton height="14px" width="25%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Skeleton height="14px" width="35%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="40%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
        <Cell>
          <Skeleton height="14px" width="20%" />
        </Cell>
      </Row>
    </>
  )
}

export default memo(SkeletonRows)
