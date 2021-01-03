import { useState } from 'react'

import { AuctionInfo, AuctionStatus } from '../../../interfaces'
import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreState } from '../../../utils/hooks/storeHooks'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import AuctionTable from '../AuctionTable'
import { Container, InnerContainer, Title } from '../Common/StyledComponents'
import Filters from './Filters'
import Header from './Header'

const ProfilePage = () => {
  const { loading, secretjs } = useSecretJs()

  // store states
  const address = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) => state.auth.viewingKey)

  // component states
  const [contracts, setContracts] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const getContracts = async () => {
    const queryMsg = {
      list_my_auctions: {
        address,
        viewing_key: viewingKey,
      },
    }

    try {
      const result = await secretjs?.queryContractSmart(
        FACTORY_CONTRACT_ADDRESS,
        queryMsg
      )
      const { active, closed } = result.list_my_auctions

      let activeSellerAuctions = []
      let activeBidderAuctions = []
      let closedSellerAuctions = []
      let closedWonAuctions = []
      if (active) {
        const { as_seller, as_bidder } = active
        if (as_seller) {
          activeSellerAuctions = as_seller.map((item: AuctionInfo) => ({
            ...item,
            seller: true,
            active: true,
          }))
        }
        if (as_bidder) {
          activeBidderAuctions = as_bidder.map((item: AuctionInfo) => ({
            ...item,
            bidder: true,
            active: true,
          }))
        }
      }

      if (closed) {
        const { as_seller: as_seller_closed, won } = closed
        if (as_seller_closed) {
          closedSellerAuctions = as_seller_closed.map((item: AuctionInfo) => ({
            ...item,
            seller: true,
            active: false,
          }))
        }
        if (won) {
          closedWonAuctions = won.map((item: AuctionInfo) => ({
            ...item,
            seller: false,
            active: false,
            winner: true,
          }))
        }
      }

      console.log(
        activeSellerAuctions,
        activeBidderAuctions,
        closedSellerAuctions,
        closedWonAuctions
      )
      setContracts(
        activeSellerAuctions.concat(
          activeBidderAuctions,
          closedSellerAuctions,
          closedWonAuctions
        )
      )
    } catch (error) {
      console.log('Error query list_my_auction', error.message)
    }
  }

  return (
    <Container>
      <InnerContainer>
        <Title>Profile</Title>
        <Header address={address} viewingKey={viewingKey} secretjs={secretjs} />
        <Filters
          search={search}
          onChange={(value) => setSearch(value.currentTarget.value)}
          filter={filter}
          onSelect={(value) => setFilter(value)}
        />
        <AuctionTable
          data={contracts}
          getContracts={getContracts}
          secretjs={secretjs}
          loading={loading}
          type={AuctionStatus.both}
        />
      </InnerContainer>
    </Container>
  )
}

export default ProfilePage
