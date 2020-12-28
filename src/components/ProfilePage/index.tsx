import { useState } from 'react'

import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { useStoreState } from '../../../utils/hooks/storeHooks'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import AuctionTable from '../AuctionsPage/AuctionTable'
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
      console.log(result)
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
        />
      </InnerContainer>
    </Container>
  )
}

export default ProfilePage
