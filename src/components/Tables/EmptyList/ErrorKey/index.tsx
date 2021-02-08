import { Cell } from '@zendeskgarden/react-tables'
import { FC, memo } from 'react'

import { Content, StyledIcon, StyledRow, Text } from '../styles'

type Props = {
  colSpan?: number
}

const ErrorKey: FC<Props> = (props) => {
  const { colSpan } = props

  return (
    <StyledRow isReadOnly>
      <Cell colSpan={colSpan}>
        <Content>
          <StyledIcon name="telescope" />
          <Text>You do not have the correct viewing key.</Text>
        </Content>
      </Cell>
    </StyledRow>
  )
}

export default memo(ErrorKey)
