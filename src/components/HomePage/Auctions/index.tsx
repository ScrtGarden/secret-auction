import { Anchor } from '@zendeskgarden/react-buttons'
import Link from 'next/link'
import Router from 'next/router'
import { memo, useMemo } from 'react'

import { PREVIEW_AUCTIONS_FILTER } from '../../../../utils/constants'
import filter from '../../../../utils/filterAuctions'
import useGetAuctions from '../../../../utils/hooks/useGetAuctions'
import useWindowSize from '../../../../utils/hooks/useWindowSize'
import shuffleArray from '../../../../utils/shuffleArray'
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
    const previewAuctions = filter(auctions, {
      include: PREVIEW_AUCTIONS_FILTER,
    })

    if (previewAuctions.length >= 6) {
      return shuffleArray(previewAuctions).slice(0, 6)
    } else {
      const restAuctions = filter(auctions, {
        exclude: PREVIEW_AUCTIONS_FILTER,
      })
      return previewAuctions.concat(restAuctions).slice(0, 6)
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
