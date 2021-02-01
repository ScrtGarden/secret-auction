import { Tag } from '@zendeskgarden/react-tags'
import { Paragraph, Title, Tooltip } from '@zendeskgarden/react-tooltips'
import { format } from 'date-fns'
import { FC, memo } from 'react'

import { DATE_FORMAT } from '../../../../../../utils/constants'

type Props = {
  active?: boolean
  isOverdue?: boolean
  winner?: boolean
  timestamp?: number
  endsAt?: number
}

const StatusTag: FC<Props> = (props) => {
  const { active, isOverdue, winner, timestamp = 0, endsAt } = props

  return (
    <>
      {active && isOverdue && (
        <Tooltip
          size="large"
          content={
            <>
              <Title>Overdue</Title>
              <Paragraph>
                Still accepting bids, however, anyone can now finalize this
                auction. Get in quick!
              </Paragraph>
            </>
          }
        >
          <Tag hue="#f79a3e">
            <span>Overdue</span>
          </Tag>
        </Tooltip>
      )}
      {active && !isOverdue && (
        <Tooltip
          size="large"
          content={
            <>
              <Title>End Date</Title>
              <Paragraph>
                {endsAt && format(endsAt * 1000, DATE_FORMAT)}
              </Paragraph>
            </>
          }
        >
          <Tag hue="mint">
            <span>Open</span>
          </Tag>
        </Tooltip>
      )}
      {!active && !winner && (
        <Tooltip
          size="large"
          content={
            <>
              <Title>Finalized Date</Title>
              <Paragraph>
                {timestamp && format(timestamp * 1000, DATE_FORMAT)}
              </Paragraph>
            </>
          }
        >
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
