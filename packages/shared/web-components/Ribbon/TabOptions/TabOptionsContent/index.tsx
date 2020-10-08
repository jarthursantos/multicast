import React from 'react'

import { useActiveTab } from '../../Wrapper/context'
import { Wrapper, Container, Separator } from './styles'
import { TabOptionsContentProps } from './types'

const TabOptionsContent: React.FC<TabOptionsContentProps> & {
  Separator: typeof Separator
} = ({ name, children }) => {
  const [isActive] = useActiveTab(name)

  return (
    <Wrapper hidden={!isActive}>
      <Container>{children}</Container>
    </Wrapper>
  )
}

TabOptionsContent.Separator = Separator

export { TabOptionsContent }
