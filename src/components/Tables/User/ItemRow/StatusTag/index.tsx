import { Tag } from '@zendeskgarden/react-tags'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { format } from 'date-fns'
import { FC, memo } from 'react'

import { DATE_FORMAT } from '../../../../../../utils/constants'

type Props = {
  active?: boolean
  isOverdue?: boolean
  winner?: boolean
  timestamp?: number
}

const StatusTag: FC<Props> = (props) => {
  const { active, isOverdue, winner, timestamp = 0 } = props

  return (
    <>
      {active && isOverdue && (
        <Tag hue="#f79a3e">
          <span>Overdue</span>
        </Tag>
      )}
      {active && !isOverdue && (
        <Tag hue="mint">
          <span>Open</span>
        </Tag>
      )}
      {!active && !winner && (
        <Tooltip content={format(timestamp * 1000, DATE_FORMAT)}>
          <Tag hue="red">
            <span>Closed</span>
          </Tag>
        </Tooltip>
      )}
      {!active && winner && (
        <Tag hue="lemon">
          <span>Winner</span>
        </Tag>
      )}
    </>
  )
}

export default memo(StatusTag)
