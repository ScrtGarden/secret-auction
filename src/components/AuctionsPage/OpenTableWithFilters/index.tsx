import { memo, useMemo, useState } from 'react'

import { FILTER_TOKENS } from '../../../../utils/constants'
import filter from '../../../../utils/filterAuctions'
import useDebounce from '../../../../utils/hooks/useDebounce'
import useGetAuctions from '../../../../utils/hooks/useGetAuctions'
import Filters from '../../Filters'
import Open from '../../Tables/Open'
import { Container } from './styles'

const OpenTableWithFilters = () => {
  // custom hooks
  const { loading, auctions } = useGetAuctions({ list_active_auctions: {} })

  // component state
  const [search, setSearch] = useState('')
  const [sellSymbol, setSellSymbol] = useState('')
  const [bidSymbol, setBidSymbol] = useState('')

  // custom hooks
  const debouncedSearch = useDebounce(search, 400)
  const debouncedSellSymbol = useDebounce(sellSymbol, 500)
  const debouncedBidSymbol = useDebounce(bidSymbol, 500)

  const filteredAuctions = useMemo(
    () => filter(auctions, { search, sellSymbol, bidSymbol }),
    [auctions, debouncedSearch, debouncedSellSymbol, debouncedBidSymbol]
  )

  return (
    <Container>
      <Filters
        searchValue={search}
        onChangeSearchValue={setSearch}
        options={FILTER_TOKENS}
        sellValue={sellSymbol}
        onChangeSellValue={setSellSymbol}
        bidValue={bidSymbol}
        onChangeBidValue={setBidSymbol}
      />
      <Open data={filteredAuctions} loading={loading} />
    </Container>
  )
}

export default memo(OpenTableWithFilters)
