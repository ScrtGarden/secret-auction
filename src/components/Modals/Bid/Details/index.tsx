import { Skeleton } from '@zendeskgarden/react-loaders'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { FC, memo } from 'react'

import { TargetTokenInfo } from '../../../../../interfaces'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import TokenInfoTooltip from '../TokenInfo'
import { Description, StyledIcon, Text, Token } from './styles'

type Props = {
  sellAmount: string | undefined
  minimumBidAmount: string | undefined
  sellToken: TargetTokenInfo | undefined
  bidToken: TargetTokenInfo | undefined
  loading: boolean
  description: string | undefined
}

const Details: FC<Props> = (props) => {
  const {
    sellToken,
    bidToken,
    sellAmount,
    minimumBidAmount,
    loading,
    description,
  } = props

  return (
    <>
      <Token>
        {!loading ? (
          <>
            <Text>
              {`Bidding for: ${toBiggestDenomination(
                sellAmount,
                sellToken?.token_info.decimals
              )} ${sellToken?.token_info.symbol}`}
            </Text>
            <Tooltip
              placement="auto"
              size="large"
              content={<TokenInfoTooltip data={sellToken} />}
              zIndex={1}
            >
              <span>
                <StyledIcon name="info-circle" />
              </span>
            </Tooltip>
          </>
        ) : (
          <Skeleton height="16px" width="40%" />
        )}
      </Token>
      <Token>
        {!loading ? (
          <>
            <Text>
              {`Minimum bid: ${toBiggestDenomination(
                minimumBidAmount,
                bidToken?.token_info.decimals
              )} ${bidToken?.token_info.symbol}`}
            </Text>{' '}
            <Tooltip
              placement="auto"
              size="large"
              content={<TokenInfoTooltip data={bidToken} />}
              zIndex={1}
            >
              <span>
                <StyledIcon name="info-circle" />
              </span>
            </Tooltip>
          </>
        ) : (
          <Skeleton height="16px" width="50%" />
        )}
      </Token>
      {description && (
        <>
          <Text nomargin>Description:</Text>
          <Description>{description}</Description>
        </>
      )}
    </>
  )
}

export default memo(Details)
