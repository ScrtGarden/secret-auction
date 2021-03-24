import { Button } from '@zendeskgarden/react-buttons'
import { Dots, Skeleton } from '@zendeskgarden/react-loaders'
import Router from 'next/router'
import { FC, FormEvent, memo, useMemo, useState } from 'react'

import { TargetTokenInfo } from '../../../../interfaces'
import { useStoreState } from '../../../../utils/hooks/storeHooks'
import usePlaceBid from '../../../../utils/hooks/usePlaceBid'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import InputWithSymbol from '../../Common/InputWithSymbol'
import SuccessBid from '../../SuccessBid'
import { Container, Details, Field, Text, Title } from './styles'

type Props = {
  loading: boolean
  sellAmount?: string
  sellDecimals?: number
  sellSymbol?: string
  bidData?: TargetTokenInfo
  minimumBid?: string
  auctionAddress: string
}

const Bid: FC<Props> = (props) => {
  const {
    loading,
    sellAmount,
    sellDecimals,
    sellSymbol,
    bidData,
    minimumBid,
    auctionAddress,
  } = props

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // custom hooks
  const { error, loading: placingBid, placeBid, txHash } = usePlaceBid()

  // component state
  const [amount, setAmount] = useState('')

  const sellInBiggestDenomination = useMemo(
    () => toBiggestDenomination(sellAmount, sellDecimals),
    [sellAmount, sellDecimals]
  )

  const bidInBiggestDenomination = useMemo(
    () => toBiggestDenomination(minimumBid, bidData?.token_info.decimals),
    [minimumBid, bidData]
  )

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const decimals = bidData?.token_info.decimals
    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      setAmount(amount)
    }
  }

  const onClickPlaceBid = async () => {
    await placeBid({
      amount,
      minimumBid: minimumBid || '',
      decimals: bidData?.token_info.decimals || 0,
      auctionAddress,
      tokenAddress: bidData?.contract_address || '',
    })
  }

  return (
    <Container>
      <Title>Bid</Title>
      {txHash ? (
        <SuccessBid
          buttonText="View Your Bids"
          amount={amount}
          symbol={bidData?.token_info.symbol}
          txHash={txHash}
          onClick={() =>
            Router.push('/profile/[id]', `/profile/${walletAddress}`)
          }
        />
      ) : (
        <>
          <InputWithSymbol
            label="Amount"
            value={amount}
            onChange={onChangeAmount}
            symbol={bidData?.token_info.symbol}
            showBalance
            tokenAddress={bidData?.contract_address}
            decimals={bidData?.token_info.decimals}
            disabled={loading || placingBid}
            error={error}
          />
          <Details>
            <Field>
              {loading ? (
                <>
                  <Skeleton height="20px" width="100px" />
                  <Skeleton height="20px" width="130px" />
                </>
              ) : (
                <>
                  <Text>On auction:</Text>
                  <Text>{`${sellInBiggestDenomination} ${sellSymbol}`}</Text>
                </>
              )}
            </Field>
            <Field grow>
              {loading ? (
                <>
                  <Skeleton height="16px" width="100px" />
                  <Skeleton height="16px" width="130px" />
                </>
              ) : (
                <>
                  <Text small>Minimum bid:</Text>
                  <Text small>
                    {`${bidInBiggestDenomination} ${bidData?.token_info.symbol}`}
                  </Text>
                </>
              )}
            </Field>
            {!loading && (
              <Field>
                <Text>Your bid:</Text>
                <Text>
                  {amount ? `${amount} ${bidData?.token_info.symbol}` : '--'}
                </Text>
              </Field>
            )}
          </Details>
          <Button
            isStretched
            isPrimary
            disabled={loading || placingBid}
            onClick={onClickPlaceBid}
          >
            {placingBid ? <Dots size="20" /> : 'Place Bid'}
          </Button>
        </>
      )}
    </Container>
  )
}

export default memo(Bid)
