import { memo } from 'react'

import { FEATURES } from '../../../../utils/constants'
import { InnerContainer } from '../../Common/StyledComponents'
import Item from './Item'
import { Content } from './styles'

const Features = () => {
  return (
    <InnerContainer>
      <Content>
        {FEATURES.map((item) => (
          <Item item={item} />
        ))}
      </Content>
    </InnerContainer>
  )
}

export default memo(Features)
