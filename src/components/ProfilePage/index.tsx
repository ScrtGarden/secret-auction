import { useContext, useReducer, useState } from 'react'

import { ActiveAuctionInfo, ClosedAuctionInfo } from '../../../interfaces'
import {
  FACTORY_CONTRACT_ADDRESS,
  FILTER_TOKENS,
} from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import useDebounce from '../../../utils/hooks/useDebounce'
import reducer from '../../../utils/reducer'
import { SecretJsContext } from '../../../utils/secretjs'
import { Container, InnerContainer, Title } from '../Common/StyledComponents'
import Filters from '../Filters/User'
import AuctionTable from '../Tables/User'
import Header from './Header'

export interface ICheckboxes {
  seller?: boolean
  bidder?: boolean
  open?: boolean
  closed?: boolean
  won?: boolean
}

export const initCheckboxes: ICheckboxes = {
  seller: false,
  bidder: false,
  open: false,
  closed: false,
  won: false,
}

const ProfilePage = () => {
  const { secretjs } = useContext(SecretJsContext)

  // store actions
  const setAuctions = useStoreActions((actions) => actions.profile.setAuctions)

  // component state
  const [sellSymbol, setSellSymbol] = useState('')
  const [bidSymbol, setBidSymbol] = useState('')
  const [checkboxes, setCheckboxes] = useReducer(reducer, initCheckboxes)

  // custom hooks
  const debouncedSellSymbol = useDebounce(sellSymbol, 500)
  const debouncedBidSymbol = useDebounce(bidSymbol, 500)

  // store states
  const filteredAuctions = useStoreState((state) =>
    state.profile.filterAuctions({
      sellSymbol: debouncedSellSymbol,
      bidSymbol: debouncedBidSymbol,
      seller: checkboxes.seller,
      bidder: checkboxes.bidder,
      open: checkboxes.open,
      closed: checkboxes.closed,
      won: checkboxes.won,
    })
  )
  const address = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) => state.auth.connectedViewingKey)

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

      const allAuctions = activeSellerAuctions.concat(
        activeBidderAuctions,
        closedSellerAuctions,
        closedWonAuctions
      )
      setAuctions(allAuctions)
      return { data: { auctions: allAuctions } }
    } catch (error) {
      console.log('Error query list_my_auction', error.message)
      setAuctions([])
      return { error: { message: error.message } }
    }
  }

  return (
    <Container>
      <InnerContainer>
        <Title>Profile</Title>
        <Header address={address} viewingKey={viewingKey} />
        <Filters
          selectedCheckboxes={checkboxes}
          onChangeCheckbox={setCheckboxes}
          options={FILTER_TOKENS}
          sellValue={sellSymbol}
          onChangeSellValue={setSellSymbol}
          bidValue={bidSymbol}
          onChangeBidValue={setBidSymbol}
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
