import { FC, memo } from 'react'

import { FILTER_TOGGLE_BUTTONS, FilterToken } from '../../../../utils/constants'
import { StyledInputWithDropdown, StyledToggleButton } from '../styles'
import { Container, Wrapper } from './styles'

const FILTERS = Object.values(FILTER_TOGGLE_BUTTONS)

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
      <Wrapper>
        {FILTERS.map((filter) => (
          <StyledToggleButton
            key={filter.value}
            isPressed={selectedBidSymbol === filter.value}
            onClick={() => onClickBidSymbol(filter.value)}
            size="small"
          >
            {filter.label}
          </StyledToggleButton>
        ))}
      </Wrapper>
      <Wrapper inputs>
        <StyledInputWithDropdown
          placeholder="Sell"
          options={options}
          value={sellValue}
          onChange={onChangeSellValue}
        />
        <StyledInputWithDropdown
          placeholder="Bid"
          options={options}
          value={bidValue}
          onChange={onChangeBidValue}
        />
      </Wrapper>
    </Container>
  )
}

export default memo(Filters)
