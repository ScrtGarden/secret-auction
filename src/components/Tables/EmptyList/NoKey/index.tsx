import { Cell } from '@zendeskgarden/react-tables'
import { FC, memo } from 'react'

import { Content, StyledIcon, StyledRow, Text } from '../styles'

type Props = {
  colSpan?: number
}

const NoKey: FC<Props> = (props) => {
  const { colSpan } = props

  return (
    <StyledRow isReadOnly>
      <Cell colSpan={colSpan}>
        <Content>
          <StyledIcon name="key-skeleton" />
          <Text>Create or import a viewing key to see your auctions.</Text>
        </Content>
      </Cell>
    </StyledRow>
  )
}

export default memo(NoKey)
