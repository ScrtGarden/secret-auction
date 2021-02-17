import styled from 'styled-components'

const Content = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-template-areas:
    'card card card'
    'card card card'
    'foot foot foot';
  justify-content: space-between;
  padding: 70px 0;
  row-gap: ${(props) => props.theme.space.lg};
`

const Footer = styled.div`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-radius: ${(props) => props.theme.borderRadii.md};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.md};
  grid-area: foot;
  justify-content: center;
  padding: ${(props) => props.theme.space.md};
  width: 100%;
`

export { Content, Footer }
