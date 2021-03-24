import { Anchor } from '@zendeskgarden/react-buttons'
import Link from 'next/link'
import Router from 'next/router'
import { memo, useMemo } from 'react'

import filter from '../../../../utils/filterAuctions'
import useGetAuctions from '../../../../utils/hooks/useGetAuctions'
import useWindowSize from '../../../../utils/hooks/useWindowSize'
import { InnerContainer } from '../../Common/StyledComponents'
import Card from './Card'
import SkeletonCard from './SkeletonCard'
import { Content, Footer } from './styles'

const SKELETON_ARRAY = Array.from(Array(6))

const Auctions = () => {
  // custom hooks
  const { loading, auctions } = useGetAuctions({ list_active_auctions: {} })
  const { width = 0 } = useWindowSize()

  const filteredAuctions = useMemo(() => {
    const tsdaiAuctions = filter(auctions, {
      include: ['SSCRT', 'TSDAI', 'TSUSDT'],
    }).slice(0, 6)

    if (tsdaiAuctions.length === 6) {
      return tsdaiAuctions
    } else {
      const restAuctions = filter(auctions, {
        exclude: ['SSCRT', 'TSDAI', 'TSUSDT'],
      })
      return tsdaiAuctions.concat(restAuctions).slice(0, 6)
    }
  }, [auctions])

  const onClick = (address: string) => {
    Router.push('/auctions/[address]', `/auctions/${address}`).then(() =>
      window.scrollTo(0, 0)
    )
  }

  return (
    <InnerContainer>
      <Content>
        {loading
          ? SKELETON_ARRAY.map((_, index) => <SkeletonCard key={index} />)
          : filteredAuctions
              .slice(0, width < 768 ? 3 : filteredAuctions.length)
              .map((item) => (
                <Card key={item.address} item={item} onClick={onClick} />
              ))}
        <Footer>
          <Link href="/auctions">
            <Anchor>View more auctions</Anchor>
          </Link>
        </Footer>
      </Content>
    </InnerContainer>
  )
}

export default memo(Auctions)
