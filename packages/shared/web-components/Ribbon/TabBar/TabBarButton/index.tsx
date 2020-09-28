import React from 'react'

import { useActiveTab } from '../../Wrapper/context'
import { Container, Label } from './styles'
import { TabBarButtonProps } from './types'

const TabBarButton: React.VFC<TabBarButtonProps> = ({ name, label }) => {
  const [isActive, selectTab] = useActiveTab(name)

  return (
    <Container className={isActive && 'active'} onClick={selectTab}>
      <Label>{label}</Label>
    </Container>
  )
}

export { TabBarButton }
