import { Close, Footer, FooterItem, Modal } from '@zendeskgarden/react-modals'
import styled from 'styled-components'

import Icon from '../../Icons'

const StyledModal = styled(Modal)`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 400px;
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

const EndAt = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.md};
`

const StyledClock = styled(Icon)`
  fill: ${(props) => props.theme.palette.grey[800]};
  height: 16px;
  margin-right: ${(props) => props.theme.space.xs};
  width: 16px;
`

const EndAtText = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin: 0;
`

const Wrapper = styled.div`
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

// const Text = styled.p`
//   color: ${(props) => props.theme.palette.grey[800]};
//   font-size: ${(props) => props.theme.fontSizes.md};
//   margin: 0;
// `

// const Token = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: row;
//   margin-bottom: ${(props) => props.theme.space.sm};
// `

// const StyledInfo = styled(Icon)`
//   fill: ${(props) => props.theme.palette.grey[600]};
//   height: 14px;
//   margin-left: ${(props) => props.theme.space.xs};
//   width: 14px;
// `

export { StyledModal, Title, EndAtText, Wrapper, Header, EndAt, StyledClock }
