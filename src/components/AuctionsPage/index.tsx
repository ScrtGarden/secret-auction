import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AuctionInfo } from '../../../interfaces'
import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import AuctionTable from '../AuctionTable'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'

const AuctionsPage = () => {
  const router = useRouter()
  const { tab } = router.query

  // custom hooks
  const { loading, error, secretjs } = useSecretJs()

  // component states
  const [openContracts, setOpenContracts] = useState<readonly AuctionInfo[]>([])
  const [closedContracts, setClosedContracts] = useState<
    readonly AuctionInfo[]
  >([])
  const [selectedTab, setSelectedTab] = useState(tab || 'open')

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
    // console.log(result)
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
    // console.log(result)
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
            <AuctionTable
              data={openContracts}
              secretjs={secretjs}
              getContracts={getOpenContracts}
              loading={loading}
              type="open"
            />
          </TabPanel>
          <TabPanel item="closed">
            <AuctionTable
              data={closedContracts}
              secretjs={secretjs}
              getContracts={getClosedContracts}
              loading={loading}
              type="closed"
            />
          </TabPanel>
        </Tabs>
      </InnerContainer>
    </Container>
  )
}

export default AuctionsPage
