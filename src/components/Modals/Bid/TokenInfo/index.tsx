import { FC, memo } from 'react'

import { TargetTokenInfo } from '../../../../../interfaces'
import { CHAIN_EXPLORER } from '../../../../../utils/constants'
import { StyledAnchor, Text, Wrapper } from './styles'

type Props = {
  data: TargetTokenInfo | undefined
}

const TokenInfoTooltip: FC<Props> = (props) => {
  const { contract_address, token_info } = props.data || {}
  const { name, symbol, total_supply } = token_info || {}

  return (
    <>
      <StyledAnchor
        isExternal
        href={`${CHAIN_EXPLORER}/contracts/${contract_address}`}
        target="_blank"
      >
        Token Details
      </StyledAnchor>
      <Wrapper>
        <Text>{`Name: ${name}`}</Text>
        <Text>{`Symbol: ${symbol}`}</Text>
        <Text>{`Total Supply: ${total_supply || 'Unknown'}`}</Text>
      </Wrapper>
    </>
  )
}

export default memo(TokenInfoTooltip)
