import { IconButton } from '@zendeskgarden/react-buttons'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { Tag } from '@zendeskgarden/react-tags'
import { Paragraph, Title, Tooltip } from '@zendeskgarden/react-tooltips'
import { format, isPast } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { DATE_FORMAT } from '../../../../utils/constants'
import useCopyToClipboard from '../../../../utils/hooks/useCopyToClipboard'
import truncateAddress from '../../../../utils/truncateAddress'
import { Separator } from '../../Common/StyledComponents'
import {
  Address,
  AddressWrapper,
  Container,
  EndDate,
  Pair,
  StyledIcon,
  Symbol,
  Wrapper,
} from './styles'

type Props = {
  loading: boolean
  sellSymbol?: string
  bidSymbol?: string
  address: string
  endDate?: string
}

const Header: FC<Props> = (props) => {
  const { loading, sellSymbol, bidSymbol, address, endDate } = props

  // custom hooks
  const [copied, copy] = useCopyToClipboard(address)

  const isOverdue = useMemo(() => endDate && isPast(new Date(endDate)), [
    endDate,
  ])

  return (
    <Container>
      <Wrapper>
        {loading ? (
          <>
            <Skeleton height="29px" width="150px" />
            <Separator xs />
            <Skeleton height="20px" width="230px" />
          </>
        ) : (
          <>
            <Pair>
              <Symbol>{sellSymbol}</Symbol>
              <Symbol bid>&nbsp;{`/ ${bidSymbol}`}</Symbol>
            </Pair>
            <AddressWrapper>
              <Address>{truncateAddress(address)}</Address>
              <Tooltip content="Copy" delayMS={300}>
                <IconButton size="small" onClick={copy}>
                  <StyledIcon name="copy" />
                </IconButton>
              </Tooltip>
            </AddressWrapper>
          </>
        )}
      </Wrapper>
      <Wrapper>
        {loading ? (
          <Skeleton width="230px" height="16px" />
        ) : (
          <EndDate>
            {`Expected Close: ${
              endDate ? format(new Date(endDate), DATE_FORMAT) : '-'
            }`}
          </EndDate>
        )}
        {!loading && isOverdue && (
          <Tooltip
            zIndex={2}
            size="large"
            placement="start"
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
        {!loading && !isOverdue && (
          <Tag hue="mint">
            <span>Open</span>
          </Tag>
        )}
      </Wrapper>
    </Container>
  )
}

export default memo(Header)
