import { HeaderItemWrapper } from '@zendeskgarden/react-chrome'
import { Dots } from '@zendeskgarden/react-loaders'
import { PALETTE } from '@zendeskgarden/react-theming'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, useState } from 'react'

import { MAP_ROUTE_AND_COLOR } from '../../../utils/constants'
import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import keplr from '../../../utils/keplr'
import Brand from '../Brand'
import {
  NavButton,
  StyledAvatar,
  StyledBody,
  StyledButton,
  StyledChrome,
  StyledHeader,
  StyledHeaderItem,
  StyledIcon,
} from './styles'

const MainHeader: FC = () => {
  const router = useRouter()
  const { pathname } = router

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const address = useStoreState((state) => state.auth.connectedAddress)

  // store actions
  const setAccounts = useStoreActions((actions) => actions.auth.setAccounts)
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleGetKeplrModal
  )

  // component state
  const [loading, setLoading] = useState<boolean>(false)

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
      toggleModal()
    } else {
      setAccounts([])
    }

    setLoading(false)
  }

  return (
    <StyledChrome isFluid>
      <StyledBody background={MAP_ROUTE_AND_COLOR[pathname]}>
        <StyledHeader isStandalone>
          <Link href="/">
            <StyledHeaderItem hasLogo>
              <Brand
                iconColor={PALETTE.green[600]}
                iconSize={35}
                fontSize={24}
                fontColor={PALETTE.grey[800]}
              />
            </StyledHeaderItem>
          </Link>
          <Link href="/create">
            <NavButton active={pathname === '/create'}>Create</NavButton>
          </Link>
          <Link href="/auctions">
            <NavButton active={pathname === '/auctions'}>Auctions</NavButton>
          </Link>
          <HeaderItemWrapper>
            {!isConnected ? (
              <StyledButton isPrimary onClick={onStart}>
                {loading ? <Dots size="20" /> : 'Start'}
              </StyledButton>
            ) : (
              <Link href="/profile/[id]" as={`/profile/${address}`}>
                <StyledAvatar backgroundColor={PALETTE.grey[600]}>
                  <StyledIcon name="user" />
                </StyledAvatar>
              </Link>
            )}
          </HeaderItemWrapper>
        </StyledHeader>
      </StyledBody>
    </StyledChrome>
  )
}

export default memo(MainHeader)
