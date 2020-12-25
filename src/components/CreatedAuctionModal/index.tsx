import { Anchor, Button } from '@zendeskgarden/react-buttons'
import {
  Body,
  Footer,
  FooterItem,
  Header,
  Modal,
} from '@zendeskgarden/react-modals'
import { FC, memo } from 'react'

import { CHAIN_EXPLORER } from '../../../utils/constants'
import { ConsignData } from '../CreatePage'
import { StyledClose } from './styles'

type Props = {
  setVisible: (option: boolean) => void
  data: ConsignData
  resetForms: () => void
}

const CreatedAuctionModal: FC<Props> = (props) => {
  const { setVisible, data, resetForms } = props

  const toggleModal = () => {
    resetForms()
    setVisible(false)
  }

  return (
    <Modal onClose={toggleModal}>
      <Header>
        Congratulation!
        <StyledClose aria-label="Close modal" />
      </Header>
      <Body>
        Your sealed bid auction was successfully created on the network. More{' '}
        <Anchor
          isExternal
          href={`${CHAIN_EXPLORER}/contracts/${data.contractAddress}`}
          target="_blank"
        >
          information of the transaction can be found here.
        </Anchor>{' '}
        <br />
        <br />
        But what now? It's time to consign the tokens to be sold.
      </Body>
      <Footer>
        <FooterItem>
          <Button onClick={toggleModal} isBasic>
            Not now
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary onClick={() => setVisible(false)}>
            Lets Go
          </Button>
        </FooterItem>
      </Footer>
    </Modal>
  )
}

export default memo(CreatedAuctionModal)
