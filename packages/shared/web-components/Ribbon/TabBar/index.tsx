import React, { useEffect } from 'react'

import { useActiveTab } from '../Wrapper/context'
import { Container } from './styles'
import { TabBarButton } from './TabBarButton'
import { TabBarProps } from './types'

const TabBar: React.VFC<TabBarProps> & { Button: typeof TabBarButton } = ({
  initialTab,
  children
}) => {
  const [, setInitialTab] = useActiveTab(initialTab)

  useEffect(() => setInitialTab(), [initialTab])

  return <Container>{children}</Container>
}

TabBar.Button = TabBarButton

export { TabBar }
