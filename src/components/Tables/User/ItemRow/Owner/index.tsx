import { Tooltip } from '@zendeskgarden/react-tooltips'
import { memo } from 'react'

import { StyledIcon } from './styles'

const Owner = () => {
  return (
    <Tooltip
      content="Owner"
      popperModifiers={{
        offset: {
          fn: (data) => {
            data.offsets.popper.top -= 6

            return data
          },
        },
      }}
    >
      <span>
        <StyledIcon name="user-circle" />
      </span>
    </Tooltip>
  )
}

export default memo(Owner)
