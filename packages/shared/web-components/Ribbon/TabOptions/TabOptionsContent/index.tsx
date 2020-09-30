import React from 'react'

import { useActiveTab } from '../../Wrapper/context'
import { Container, Separator } from './styles'
import { TabOptionsContentProps } from './types'

const TabOptionsContent: React.FC<TabOptionsContentProps> & {
  Separator: typeof Separator
} = ({ name, children }) => {
  const [isActive] = useActiveTab(name)

  return <Container hidden={!isActive}>{children}</Container>
}

TabOptionsContent.Separator = Separator

export { TabOptionsContent }
