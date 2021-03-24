import { FC, memo } from 'react'

import { FilterToken } from '../../../../utils/constants'
import { StyledInputWithDropdown, StyledToggleButton } from '../styles'
import { Container, Wrapper } from './styles'

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
        <StyledToggleButton
          isPressed={selectedBidSymbol === 'TSDAI'}
          onClick={() => onClickBidSymbol('TSDAI')}
          size="small"
        >
          TSDAI Auctions
        </StyledToggleButton>
        <StyledToggleButton
          isPressed={selectedBidSymbol === 'TSDAI'}
          onClick={() => onClickBidSymbol('TSDAI')}
          size="small"
        >
          TSDAI Auctions
        </StyledToggleButton>
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
