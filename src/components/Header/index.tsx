import {
  Header,
  HeaderItemIcon,
  HeaderItemWrapper,
} from '@zendeskgarden/react-chrome'
import { Dots } from '@zendeskgarden/react-loaders'
import { PALETTE } from '@zendeskgarden/react-theming'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, useState } from 'react'

import { MAP_ROUTE_AND_COLOR } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
import GetKeplrModal from '../GetKeplrModal'
import {
  MainIcon,
  StyledAvatar,
  StyledBody,
  StyledButton,
  StyledChrome,
  StyledHeaderItem,
  StyledHeaderItemText,
  StyledIcon,
} from './styles'

const MainHeader: FC = () => {
  const router = useRouter()
  const { pathname } = router

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // store actions
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)

  // component state
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)

  const onStart = async () => {
    setLoading(true)
    const connect = await keplr.connect()

    if (connect.success) {
      const accountsResponse = await keplr.getAccounts()

      if (accountsResponse.accounts) {
        setAccounts(accountsResponse.accounts)
        if (pathname === '/') {
          router.push('/create')
        }
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
          <Link href="/auctions">
            <StyledHeaderItem>
              <StyledHeaderItemText selected={pathname === '/auctions'}>
                Auctions
              </StyledHeaderItemText>
            </StyledHeaderItem>
          </Link>
          <HeaderItemWrapper>
            {!isConnected ? (
              <StyledButton isPrimary onClick={onStart}>
                {loading ? <Dots size="20" /> : 'Start'}
              </StyledButton>
            ) : (
              <StyledAvatar backgroundColor={PALETTE.grey[600]}>
                <StyledIcon name="user" />
              </StyledAvatar>
            )}
          </HeaderItemWrapper>
        </Header>
        {visible && <GetKeplrModal setVisible={setVisible} />}
      </StyledBody>
    </StyledChrome>
  )
}

export default memo(MainHeader)
