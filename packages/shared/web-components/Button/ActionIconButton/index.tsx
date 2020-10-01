import React from 'react'

import { Container, Label, IconWrapper } from './styles'
import { ActionIconButtonProps } from './types'

const ActionIconButton: React.VFC<ActionIconButtonProps> = ({
  icon,
  label,
  width,
  ...rest
}) => {
  return (
    <Container width={width} {...rest}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </Container>
  )
}

export { ActionIconButton }
