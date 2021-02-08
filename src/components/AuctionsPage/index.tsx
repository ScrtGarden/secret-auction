import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import Closed from '../Tables/Closed'
import OpenTableWithFilters from './OpenTableWithFilters'

const AuctionsPage = () => {
  const router = useRouter()
  const { tab } = router.query

  // component states
  const [selectedTab, setSelectedTab] = useState(tab || 'open')

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab)
    }
  }, [tab])

  return (
    <Container>
      <InnerContainer>
        <StyledTitle>Auctions</StyledTitle>
        <Tabs
          style={{ overflow: 'unset' }}
          selectedItem={selectedTab}
          onChange={setSelectedTab}
        >
          <TabList>
            <Tab item="open">Open</Tab>
            <Tab item="closed">Closed</Tab>
          </TabList>
          <TabPanel item="open">
            <OpenTableWithFilters />
          </TabPanel>
          <TabPanel item="closed">
            <Closed />
          </TabPanel>
        </Tabs>
      </InnerContainer>
    </Container>
  )
}

export default AuctionsPage
