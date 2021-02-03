import { Tag } from '@zendeskgarden/react-tags'
import { Paragraph, Title, Tooltip } from '@zendeskgarden/react-tooltips'
import { FC, memo } from 'react'

type Props = {
  isOverdue?: boolean
}

const StatusTag: FC<Props> = (props) => {
  const { isOverdue } = props

  return (
    <>
      {isOverdue ? (
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
      ) : (
        <Tag hue="mint">
          <span>Open</span>
        </Tag>
      )}
    </>
  )
}

export default memo(StatusTag)
