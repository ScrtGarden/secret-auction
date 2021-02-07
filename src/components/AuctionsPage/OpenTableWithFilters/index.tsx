import { memo, useMemo, useState } from 'react'

import { FILTER_TOKENS } from '../../../../utils/constants'
import filter from '../../../../utils/filterAuctions'
import useDebounce from '../../../../utils/hooks/useDebounce'
import useGetAuctions from '../../../../utils/hooks/useGetAuctions'
import { Separator } from '../../Common/StyledComponents'
import Filters from '../../Filters/Open'
import Open from '../../Tables/Open'
import { Container } from './styles'

const OpenTableWithFilters = () => {
  // custom hooks
  const { loading, auctions } = useGetAuctions({ list_active_auctions: {} })

  // component state
  const [sellSymbol, setSellSymbol] = useState('')
  const [bidSymbol, setBidSymbol] = useState('')
  const [selectedBidSymbol, setSelectedBidSymbol] = useState('')

  // custom hooks
  const debouncedSellSymbol = useDebounce(sellSymbol, 500)
  const debouncedBidSymbol = useDebounce(bidSymbol, 500)

  const filteredAuctions = useMemo(
    () => filter(auctions, { sellSymbol, bidSymbol, selectedBidSymbol }),
    [auctions, debouncedSellSymbol, debouncedBidSymbol, selectedBidSymbol]
  )

  return (
    <Container>
      <Filters
        selectedBidSymbol={selectedBidSymbol}
        onClickBidSymbol={setSelectedBidSymbol}
        options={FILTER_TOKENS}
        sellValue={sellSymbol}
        onChangeSellValue={setSellSymbol}
        bidValue={bidSymbol}
        onChangeBidValue={setBidSymbol}
      />
      <Separator md />
      <Open data={filteredAuctions} loading={loading} />
    </Container>
  )
}

export default memo(OpenTableWithFilters)
