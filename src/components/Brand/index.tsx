import { FC, memo } from 'react'

import { Brandmark, Container, StyledIcon } from './styles'

type Props = {
  iconSize?: number
  fontSize?: number
  iconColor?: string
  fontColor?: string
}

const Brand: FC<Props> = (props) => {
  const { iconSize, fontSize, iconColor, fontColor } = props

  return (
    <Container>
      <StyledIcon name="tulip" size={iconSize} color={iconColor} />
      <Brandmark size={fontSize} color={fontColor}>
        tulip
      </Brandmark>
    </Container>
  )
}

export default memo(Brand)
