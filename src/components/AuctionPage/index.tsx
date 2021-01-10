import { IconButton } from '@zendeskgarden/react-buttons'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { useRouter } from 'next/router'

import useCopyToClipboard from '../../../utils/hooks/useCopyToClipboard'
import useGetAuction from '../../../utils/hooks/useGetAuction'
import truncateAddress from '../../../utils/truncateAddress'
import { Container, InnerContainer } from '../Common/StyledComponents'
import { Address, StyledIcon, Title, Wrapper } from './styles'

const AuctionPage = () => {
  const router = useRouter()
  const { address = '' }: { address?: string } = router.query

  // custom hooks
  const { loading, data, error } = useGetAuction(address)
  const [copied, copy] = useCopyToClipboard(address)

  console.log(loading, data, error)
  return (
    <Container>
      <InnerContainer>
        <Title>Auction</Title>
        <Wrapper>
          <Address>{truncateAddress(address)}</Address>
          <Tooltip content="Copy" delayMS={300}>
            <IconButton size="small" onClick={copy}>
              <StyledIcon name="copy" />
            </IconButton>
          </Tooltip>
        </Wrapper>
      </InnerContainer>
    </Container>
  )
}

export default AuctionPage
