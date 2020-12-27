import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Contract } from '../../../interfaces'
import { FACTORY_CONTRACT_ADDRESS } from '../../../utils/constants'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import AuctionTable from './AuctionTable'

const AuctionsPage = () => {
  const router = useRouter()
  const { tab } = router.query

  // custom hooks
  const { loading, error, secretjs } = useSecretJs()

  // component states
  const [openContracts, setOpenContracts] = useState<readonly Contract[]>([])
  const [closedContracts, setClosedContracts] = useState<readonly Contract[]>(
    []
  )
  const [selectedTab, setSelectedTab] = useState(tab || 'open')

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab)
    }
  }, [tab])

  const getOpenContracts = async () => {
    const { list_active_auctions } = await secretjs?.queryContractSmart(
      FACTORY_CONTRACT_ADDRESS,
      {
        list_active_auctions: {},
      }
    )
    if (list_active_auctions) {
      setOpenContracts(list_active_auctions.active)
    }
  }

  const getClosedContracts = async () => {
    const { list_closed_auctions } = await secretjs?.queryContractSmart(
      FACTORY_CONTRACT_ADDRESS,
      {
        list_closed_auctions: {},
      }
    )

    if (list_closed_auctions) {
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
            />
          </TabPanel>
          <TabPanel item="closed">
            <AuctionTable
              data={closedContracts}
              secretjs={secretjs}
              getContracts={getClosedContracts}
              loading={loading}
            />
          </TabPanel>
        </Tabs>
      </InnerContainer>
    </Container>
  )
}

export default AuctionsPage
