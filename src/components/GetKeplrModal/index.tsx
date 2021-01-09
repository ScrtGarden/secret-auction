import { Button } from '@zendeskgarden/react-buttons'
import {
  Close,
  Footer,
  FooterItem,
  Header,
  Modal,
} from '@zendeskgarden/react-modals'
import { FC, memo } from 'react'

import { useStoreActions } from '../../../utils/hooks/storeHooks'
import { StyledBody, StyledIcon } from './styles'

const GetKeplrModal: FC = () => {
  const toggleModal = useStoreActions(
    (actions) => actions.controls.toggleGetKeplrModal
  )

  const onClick = () => {
    window.open(
      'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
      '_blank'
    )
    toggleModal()
  }

  return (
    <Modal onClose={() => toggleModal()}>
      <Header>Wanna trade?</Header>
      <StyledBody>
        <StyledIcon name="keplr" /> 9 out of 10 Secret Agents recommends Keplr.
        It's also a simple, open-source browser extension wallet.
      </StyledBody>
      <Footer>
        <FooterItem>
          <Button isPrimary onClick={onClick}>
            Get from Chrome Web Store
          </Button>
        </FooterItem>
      </Footer>
      <Close aria-label="Close modal" />
    </Modal>
  )
}

export default memo(GetKeplrModal)
