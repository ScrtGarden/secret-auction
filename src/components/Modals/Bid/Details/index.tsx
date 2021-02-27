import { Button } from '@zendeskgarden/react-buttons'
import { Dots, Skeleton } from '@zendeskgarden/react-loaders'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { format } from 'date-fns'
import { FC, FormEvent, memo, useMemo } from 'react'

import { TargetTokenInfo } from '../../../../../interfaces'
import { DATE_FORMAT } from '../../../../../utils/constants'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import InputWithSymbol from '../../../Common/InputWithSymbol'
import { Separator } from '../../../Common/StyledComponents'
import TokenInfoTooltip from '../TokenInfo'
import {
  Container,
  Description,
  EndAt,
  EndAtText,
  StyledClock,
  StyledIcon,
  Text,
  Token,
} from './styles'

type Props = {
  endsAt: string | undefined
  sellAmount: string | undefined
  minimumBidAmount: string | undefined
  sellToken: TargetTokenInfo | undefined
  bidToken: TargetTokenInfo | undefined
  loadingData: boolean
  description: string | undefined
  label: string
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  error?: string
  bidding: boolean
  bidError: boolean
  onSubmit: () => void
  loading?: boolean
}

const Details: FC<Props> = (props) => {
  const {
    endsAt,
    sellToken,
    bidToken,
    sellAmount,
    minimumBidAmount,
    loadingData,
    description,
    label,
    value,
    onChange,
    error,
    bidding,
    onSubmit,
    loading,
  } = props

  const formattedDate = useMemo(
    () => (endsAt ? format(new Date(endsAt), DATE_FORMAT) : ''),
    [endsAt]
  )

  return (
    <Container>
      <EndAt>
        {!loadingData ? (
          <>
            <StyledClock name="clock" />
            <EndAtText>{formattedDate}</EndAtText>
          </>
        ) : (
          <Skeleton height="16px" width="200px" />
        )}
      </EndAt>
      <Token>
        {!loadingData ? (
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
        {!loadingData ? (
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
      <Separator lg />
      <InputWithSymbol
        placeholder="Enter bid"
        label={label}
        value={value}
        onChange={onChange}
        symbol={bidToken?.token_info.symbol}
        error={error}
        showBalance
        tokenAddress={bidToken?.contract_address}
        decimals={bidToken?.token_info.decimals}
        disabled={loading}
      />
      <Separator md />
      <Button
        isPrimary
        isStretched
        disabled={loadingData || bidding || loading}
        onClick={onSubmit}
      >
        {bidding ? <Dots size="20" /> : 'Place Bid'}
      </Button>
    </Container>
  )
}

export default memo(Details)
