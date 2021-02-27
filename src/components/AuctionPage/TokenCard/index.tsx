import { Anchor } from '@zendeskgarden/react-buttons'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { FC, memo } from 'react'

import { TargetTokenInfo } from '../../../../interfaces'
import { CHAIN_EXPLORER } from '../../../../utils/constants'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import {
  Amount,
  AmountWrapper,
  Container,
  Content,
  Details,
  Field,
  Lable,
  Text,
  Title,
  Warning,
} from './styles'

type Props = {
  loading: boolean
  title?: string
  tokenData?: TargetTokenInfo
  warning?: boolean
  amount?: string
  amountLabel: string
}

const TokenCard: FC<Props> = (props) => {
  const { title, tokenData, warning, amount, amountLabel, loading } = props
  const { contract_address, token_info } = tokenData || {}

  return (
    <Container>
      <Title large>{title}</Title>
      {warning && (
        <Warning>Please ensure you're bidding for the correct token.</Warning>
      )}
      <Content>
        <Details>
          <Field>
            <Lable>Symbol</Lable>
            {loading ? (
              <Skeleton width="50px" height="16px" />
            ) : (
              <Text>{token_info?.symbol}</Text>
            )}
          </Field>
          <Field>
            <Lable>Total Supply</Lable>
            {loading ? (
              <Skeleton width="110px" height="16px" />
            ) : (
              <Text>{token_info?.total_supply || 'Unknown'}</Text>
            )}
          </Field>
          {!loading && (
            <Anchor
              href={`${CHAIN_EXPLORER}/contracts/${contract_address}`}
              isExternal
            >
              View Contract
            </Anchor>
          )}
        </Details>
        <AmountWrapper>
          <Title>{amountLabel}</Title>
          <Amount>
            {loading ? (
              <Skeleton width="50px" height="20px" />
            ) : (
              toBiggestDenomination(amount, token_info?.decimals)
            )}
          </Amount>
        </AmountWrapper>
      </Content>
    </Container>
  )
}

export default memo(TokenCard)
