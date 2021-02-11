import styled from 'styled-components'

import Icon from '../Icons'

type IconProps = {
  readonly color?: string
  readonly size?: number
}

type BrandmarkProps = {
  readonly color?: string
  readonly size?: number
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const StyledIcon = styled(Icon).attrs<IconProps>((props) => ({
  style: {
    fill: props.color,
    height: `${props.size || 10}px`,
    width: `${props.size || 10}px`,
  },
}))<IconProps>`
  margin-right: ${(props) => props.theme.space.xs};
`

export const Brandmark = styled.p.attrs<BrandmarkProps>((props) => ({
  style: {
    color: props.color,
    fontSize: `${props.size || 10}px`,
  },
}))<BrandmarkProps>`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin: 0;
`
