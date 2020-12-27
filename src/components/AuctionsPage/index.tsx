import { Skeleton } from '@zendeskgarden/react-loaders'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@zendeskgarden/react-tables'
import { SetStateAction, useEffect, useState } from 'react'

import { Contract } from '../../../interfaces'
import { AUCTION_CONTRACT_ID } from '../../../utils/constants'
import useSecretJs from '../../../utils/hooks/useSecretJs'
import {
  Container,
  InnerContainer,
  Title as StyledTitle,
} from '../Common/StyledComponents'
import ItemRow from './ItemRow'

const AuctionsPage = () => {
  // custom hooks
  const { loading, error, secretjs } = useSecretJs()

  // component states
  const [loadingContracts, setLoadingContracts] = useState(false)
  const [contracts, setContracts] = useState<readonly Contract[]>([])

  useEffect(() => {
    const getContracts = async () => {
      const result = await secretjs?.getContracts(AUCTION_CONTRACT_ID)
      if (result) {
        setContracts(result)
      }
    }

    if (secretjs) {
      getContracts()
    }
  }, [loading])

  return (
    <Container>
      <InnerContainer>
        <StyledTitle>Auctions</StyledTitle>
        <Table>
          <Head>
            <HeaderRow>
              <HeaderCell>Label</HeaderCell>
              <HeaderCell>Trading</HeaderCell>
              <HeaderCell>Minimum Bid</HeaderCell>
              <HeaderCell>Actions</HeaderCell>
              <HeaderCell>Status</HeaderCell>
            </HeaderRow>
          </Head>
          <Body>
            {contracts.map((item) => (
              <ItemRow key={item.address} item={item} secretjs={secretjs} />
            ))}
          </Body>
        </Table>
      </InnerContainer>
    </Container>
  )
}

export default AuctionsPage
