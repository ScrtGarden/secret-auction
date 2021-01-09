import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { ActiveAuctionInfo, ClosedAuctionInfo } from '../../../interfaces'
import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import { SecretJsContext } from '../../../utils/secretjs'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import Closed from '../Tables/Closed'
import Open from '../Tables/Open'

const AuctionsPage = () => {
  const router = useRouter()
  const { tab } = router.query

  const { secretjs } = useContext(SecretJsContext)

  // component states
  const [openContracts, setOpenContracts] = useState<
    readonly ActiveAuctionInfo[]
  >([])
  const [closedContracts, setClosedContracts] = useState<
    readonly ClosedAuctionInfo[]
  >([])
  const [selectedTab, setSelectedTab] = useState(tab || 'open')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab)
    }
  }, [tab])

  const getOpenContracts = async () => {
    const result = await secretjs?.queryContractSmart(
      FACTORY_CONTRACT_ADDRESS,
      {
        list_active_auctions: {},
      }
    )

    const { list_active_auctions } = result
    console.log(result)
    if (list_active_auctions.active) {
      setOpenContracts(list_active_auctions.active)
    }
  }

  const getClosedContracts = async () => {
    const result = await secretjs?.queryContractSmart(
      FACTORY_CONTRACT_ADDRESS,
      {
        list_closed_auctions: {},
      }
    )
    const { list_closed_auctions } = result
    console.log(result)
    if (list_closed_auctions.closed) {
      setClosedContracts(list_closed_auctions.closed)
    }
  }

  return (
    <Container>
      <InnerContainer>
        <StyledTitle>Auctions</StyledTitle>
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList>
            <Tab item="open">Open</Tab>
            <Tab item="closed">Closed</Tab>
          </TabList>
          <TabPanel item="open">
            <Open data={openContracts} getContracts={getOpenContracts} />
          </TabPanel>
          <TabPanel item="closed">
            <Closed data={closedContracts} getContracts={getClosedContracts} />
          </TabPanel>
        </Tabs>
      </InnerContainer>
    </Container>
  )
}

export default AuctionsPage
