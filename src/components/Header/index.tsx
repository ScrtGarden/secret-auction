import {
  Header,
  HeaderItemIcon,
  HeaderItemText,
  HeaderItemWrapper,
} from '@zendeskgarden/react-chrome'
import { Dots } from '@zendeskgarden/react-loaders'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, useMemo, useState } from 'react'

import { MAP_ROUTE_AND_COLOR } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
import truncateAddress from '../../../utils/truncateAddress'
import GetKeplrModal from '../GetKeplrModal'
import {
  Address,
  MainIcon,
  StyledBody,
  StyledButton,
  StyledChrome,
  StyledHeaderItem,
  StyledHeaderItemText,
} from './styles'

const MainHeader: FC = () => {
  const router = useRouter()
  const { pathname } = router

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
        router.push('/create')
      }
    } else if (connect.error?.message === 'Kelpr not installed.') {
      setVisible(true)
    } else {
      setAccounts([])
    }

    setLoading(false)
  }

  return (
    <StyledChrome isFluid>
      <StyledBody background={MAP_ROUTE_AND_COLOR[pathname]}>
        <Header isStandalone>
          <Link href="/">
            <StyledHeaderItem hasLogo>
              <HeaderItemIcon>
                <MainIcon name="seedling" />
              </HeaderItemIcon>
            </StyledHeaderItem>
          </Link>
          <Link href="/create">
            <StyledHeaderItem>
              <StyledHeaderItemText selected={pathname === '/create'}>
                Create
              </StyledHeaderItemText>
            </StyledHeaderItem>
          </Link>
          <StyledHeaderItem>
            <StyledHeaderItemText selected={pathname === '/bid'}>
              Bid
            </StyledHeaderItemText>
          </StyledHeaderItem>
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
      </StyledBody>
    </StyledChrome>
  )
}

export default memo(MainHeader)
