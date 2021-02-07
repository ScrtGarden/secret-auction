import { ToggleButton } from '@zendeskgarden/react-buttons'
import { FC, memo } from 'react'

import { FilterToken } from '../../../../utils/constants'
import InputWithDropdown from '../../Common/InputWithDropdown'
import { Container } from './styles'

type Props = {
  selectedBidSymbol: string
  onClickBidSymbol: (value: string) => void
  options: FilterToken[]
  sellValue: string
  onChangeSellValue: (value: string) => void
  bidValue: string
  onChangeBidValue: (value: string) => void
}

const Filters: FC<Props> = (props) => {
  const {
    selectedBidSymbol,
    onClickBidSymbol,
    options,
    sellValue,
    onChangeSellValue,
    bidValue,
    onChangeBidValue,
  } = props

  return (
    <Container>
      <ToggleButton
        isPressed={selectedBidSymbol === ''}
        onClick={() => onClickBidSymbol('')}
        size="small"
      >
        All
      </ToggleButton>
      <ToggleButton
        isPressed={selectedBidSymbol === 'SSCRT'}
        onClick={() => onClickBidSymbol('SSCRT')}
        size="small"
      >
        SSCRT Auctions
      </ToggleButton>
      <ToggleButton
        isPressed={selectedBidSymbol === 'SDAI'}
        onClick={() => onClickBidSymbol('SDAI')}
        size="small"
      >
        SDAI Auctions
      </ToggleButton>
      <div />
      <InputWithDropdown
        placeholder="Sell"
        options={options}
        value={sellValue}
        onChange={onChangeSellValue}
      />
      <InputWithDropdown
        placeholder="Bid"
        options={options}
        value={bidValue}
        onChange={onChangeBidValue}
      />
    </Container>
  )
}

export default memo(Filters)
