import { Cell } from '@zendeskgarden/react-tables'
import { FC, memo } from 'react'

import { Content, StyledIcon, StyledRow, Text } from '../styles'

type Props = {
  colSpan?: number
}

const NoResult: FC<Props> = (props) => {
  const { colSpan } = props

  return (
    <StyledRow isReadOnly>
      <Cell colSpan={colSpan}>
        <Content>
          <StyledIcon name="shovel" />
          <Text>We dug deep, but couldn't find anything.</Text>
        </Content>
      </Cell>
    </StyledRow>
  )
}

export default memo(NoResult)
