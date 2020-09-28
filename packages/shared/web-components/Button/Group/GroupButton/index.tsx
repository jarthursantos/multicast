import React from 'react'

import { useActiveButton } from '../context'
import { Container, IconWrapper, Label } from './styles'
import { GroupButtonProps } from './types'

const GroupButton: React.FC<GroupButtonProps> = ({
  name,
  icon,
  label,
  width
}) => {
  const [isActive, selectButton] = useActiveButton(name)

  return (
    <Container
      width={width}
      onClick={selectButton}
      className={isActive && 'active'}
    >
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </Container>
  )
}

export default GroupButton
