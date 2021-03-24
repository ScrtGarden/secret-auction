import { Message } from '@zendeskgarden/react-forms'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { Modal } from '@zendeskgarden/react-modals'
import { Code } from '@zendeskgarden/react-typography'
import styled from 'styled-components'

import { media } from '../../../styles/mediaQueries'

type SeparatorProps = {
  readonly xxs?: boolean
  readonly xs?: boolean
  readonly sm?: boolean
  readonly md?: boolean
  readonly lg?: boolean
}

const Container = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.palette.grey[100]};
  padding-bottom: 50px;
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
  width: 90%;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.space.xl};
  margin-top: 0;
`

const FieldGrid = styled.div`
  display: grid;
  row-gap: 10px;
`

const StyledMessage = styled(Message)`
  margin-top: ${(props) => props.theme.space.xs};
`

const Separator = styled.div<SeparatorProps>`
  ${(props) => props.xxs && `height: ${props.theme.space.xxs}`};
  ${(props) => props.xs && `height: ${props.theme.space.xs}`};
  ${(props) => props.sm && `height: ${props.theme.space.sm}`};
  ${(props) => props.md && `height: ${props.theme.space.md}`};
  ${(props) => props.lg && `height: ${props.theme.space.lg}`};
`

const StyledCode = styled(Code)`
  word-break: break-all;
`

const StyledModal = styled(Modal)`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: unset;
  width: 90%;

  ${media.mobileL} {
    width: 400px;
  }
`

const ModalHeader = styled.div`
  flex: 1;
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const ModalTitle = styled.h1`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 0;
`

const ModalContent = styled.div`
  padding: ${(props) => props.theme.space.md} ${(props) => props.theme.space.lg};
  width: 100%;
`

const ModalText = styled.p`
  color: ${(props) => props.theme.palette.grey[800]};
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: ${(props) => props.theme.lineHeights.md};
  margin: 0;
`

const ModalButtons = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  margin-top: ${(props) => props.theme.space.lg};
  width: 100%;
`

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${(props) => props.theme.space.xxs};

  :last-child {
    margin: 0;
  }
`

const BrandName = styled.h1`
  color: ${(props) => props.theme.palette.kale[800]};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: 0;
`

export {
  Container,
  InnerContainer,
  Title,
  FieldGrid,
  StyledMessage,
  Separator,
  StyledCode,
  StyledModal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalText,
  StyledSkeleton,
  BrandName,
  ModalButtons,
}
