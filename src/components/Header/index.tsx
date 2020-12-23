import { Button } from '@zendeskgarden/react-buttons'
import {
  Body,
  Chrome,
  Header,
  HeaderItem,
  HeaderItemIcon,
  HeaderItemText,
  HeaderItemWrapper,
} from '@zendeskgarden/react-chrome'
import { Dots } from '@zendeskgarden/react-loaders'
import { FC, memo, useMemo, useState } from 'react'

import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
import truncateAddress from '../../../utils/truncateAddress'
import GetKeplrModal from '../GetKeplrModal'
import { Address, MainIcon, StyledButton } from './styles'

const MainHeader: FC = () => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const accounts = useStoreState((state) => state.auth.accounts)

  // store actions
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)

  // component state
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)

  const parsedAddress = useMemo(
    () => (isConnected ? truncateAddress(accounts[0].address) : ''),
    [accounts]
  )

  const onStart = async () => {
    setLoading(true)
    const connect = await keplr.connect()

    if (connect.success) {
      const accountsResponse = await keplr.getAccounts()

      if (accountsResponse.accounts) {
        setAccounts(accountsResponse.accounts)
      }
    } else if (connect.error?.message === 'Kelpr not installed.') {
      setVisible(true)
    } else {
      setAccounts([])
    }

    setLoading(false)
  }

  return (
    <Chrome isFluid style={{ height: 80 }}>
      <Body>
        <Header isStandalone>
          <HeaderItem hasLogo>
            <HeaderItemIcon>
              <MainIcon name="seedling" />
            </HeaderItemIcon>
          </HeaderItem>
          <HeaderItem>
            <HeaderItemText>Buy</HeaderItemText>
          </HeaderItem>
          <HeaderItem>
            <HeaderItemText>Sell</HeaderItemText>
          </HeaderItem>
          <HeaderItemWrapper>
            {!isConnected ? (
              <StyledButton isPrimary onClick={onStart}>
                {loading ? <Dots size="20" /> : 'Start'}
              </StyledButton>
            ) : (
              <Address>{parsedAddress}</Address>
            )}
          </HeaderItemWrapper>
        </Header>
        {visible && <GetKeplrModal setVisible={setVisible} />}
      </Body>
    </Chrome>
  )
}

export default memo(MainHeader)
