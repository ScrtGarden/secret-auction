import { useContext, useState } from 'react'

import { ActiveAuctionInfo, ClosedAuctionInfo } from '../../../interfaces'
import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import { SecretJsContext } from '../../../utils/secretjs'
import { Container, InnerContainer, Title } from '../Common/StyledComponents'
import AuctionTable from '../Tables/User'
import Filters from './Filters'
import Header from './Header'

const ProfilePage = () => {
  const { secretjs } = useContext(SecretJsContext)

  // store actions
  const setAuctions = useStoreActions((actions) => actions.profile.setAuctions)

  const [search, setSearch] = useState('')

  // store states
  const filteredAuctions = useStoreState((state) =>
    state.profile.filterAuctions({ search })
  )
  const address = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) => state.auth.connectedViewingKey)

  // component states
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
          activeSellerAuctions = as_seller.map((item: ActiveAuctionInfo) => ({
            ...item,
            seller: true,
            active: true,
          }))
        }
        if (as_bidder) {
          activeBidderAuctions = as_bidder.map((item: ActiveAuctionInfo) => ({
            ...item,
            bidder: true,
            active: true,
          }))
        }
      }

      if (closed) {
        const { as_seller: as_seller_closed, won } = closed
        if (as_seller_closed) {
          closedSellerAuctions = as_seller_closed.map(
            (item: ClosedAuctionInfo) => ({
              ...item,
              seller: true,
              active: false,
            })
          )
        }
        if (won) {
          closedWonAuctions = won.map((item: ClosedAuctionInfo) => ({
            ...item,
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
      setAuctions(
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
        <Header address={address} viewingKey={viewingKey} />
        <Filters
          search={search}
          onChange={(value) => setSearch(value.currentTarget.value)}
          filter={filter}
          onSelect={(value) => setFilter(value)}
        />
        <AuctionTable
          data={filteredAuctions}
          getContracts={getContracts}
          viewingKey={viewingKey}
        />
      </InnerContainer>
    </Container>
  )
}

export default ProfilePage
