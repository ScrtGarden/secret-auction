import { Skeleton } from '@zendeskgarden/react-loaders'
import { memo, useEffect, useMemo, useState } from 'react'
import { FC } from 'react'

import useGetBalance from '../../../../utils/hooks/useGetBalance'
import useRequestUnlock from '../../../../utils/hooks/useRequestUnlock'
import toBiggestDenomination from '../../../../utils/toBiggestDenomination'
import { Container, StyledIcon, Text, Unlock } from './styles'

type Props = {
  tokenAddress?: string
  symbol?: string
  decimals?: number
}

const Balance: FC<Props> = (props) => {
  const { tokenAddress, symbol, decimals } = props

  // component state
  const [loading, setLoading] = useState(!tokenAddress)

  // custom hook
  const { loading: unlocking, success, requestUnlock } = useRequestUnlock(
    tokenAddress
  )
  const { loading: loadingBalance, amount, error } = useGetBalance(
    tokenAddress,
    [success]
  )
  const amountInBiggestDenomination = useMemo(
    () => toBiggestDenomination(amount, decimals),
    [amount]
  )

  useEffect(() => {
    if (tokenAddress) {
      setLoading(false)
    }
  }, [tokenAddress])

  const unlock = async () => {
    await requestUnlock()
  }

  return (
    <Container>
      <Text>{`Balance:`}&nbsp;</Text>
      {loading || loadingBalance || unlocking ? (
        <Skeleton height="12px" width="80px" />
      ) : (
        <>
          {error ? (
            <Unlock onClick={unlock}>
              <StyledIcon name="key-skeleton" /> <Text>Unlock</Text>
            </Unlock>
          ) : (
            <Text>{`${amountInBiggestDenomination} ${symbol}`}</Text>
          )}
        </>
      )}
    </Container>
  )
}

export default memo(Balance)
