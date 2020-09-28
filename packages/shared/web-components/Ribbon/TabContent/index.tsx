import React from 'react'

import { useActiveTab } from '../Wrapper/context'
import { Container } from './styles'
import { TabContentProps } from './types'

const TabContent: React.FC<TabContentProps> = ({ children, name }) => {
  const [isActive] = useActiveTab(name)

  return <Container hidden={!isActive}>{children}</Container>
}

export { TabContent }
