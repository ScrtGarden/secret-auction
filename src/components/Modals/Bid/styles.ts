import { Modal } from '@zendeskgarden/react-modals'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  align-items: center;
  display: flex;
  flex-direction: column;
  && {
    width: 400px;
  }
`

const Header = styled.div`
  flex: 1;
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const Title = styled.h1`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;
`

export { StyledModal, Title, Header }
