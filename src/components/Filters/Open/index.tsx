import { ToggleButton } from '@zendeskgarden/react-buttons'
import { FC, memo } from 'react'

import { FilterToken } from '../../../../utils/constants'
import InputWithDropdown from '../../Common/InputWithDropdown'
import { StyledToggleButton } from '../styles'
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
      <StyledToggleButton
        isPressed={selectedBidSymbol === ''}
        onClick={() => onClickBidSymbol('')}
        size="small"
      >
        All
      </StyledToggleButton>
      <StyledToggleButton
        isPressed={selectedBidSymbol === 'SSCRT'}
        onClick={() => onClickBidSymbol('SSCRT')}
        size="small"
      >
        SSCRT Auctions
      </StyledToggleButton>
      <StyledToggleButton
        isPressed={selectedBidSymbol === 'TSDAI'}
        onClick={() => onClickBidSymbol('TSDAI')}
        size="small"
      >
        TSDAI Auctions
      </StyledToggleButton>
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
