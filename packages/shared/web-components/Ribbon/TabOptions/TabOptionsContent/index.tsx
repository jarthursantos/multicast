import React from 'react'

import { useActiveTab } from '../../Wrapper/context'
import { Container } from './styles'
import { TabOptionsContentProps } from './types'

const TabOptionsContent: React.FC<TabOptionsContentProps> = ({
  name,
  children
}) => {
  const [isActive] = useActiveTab(name)

  return <Container hidden={!isActive}>{children}</Container>
}

export { TabOptionsContent }
