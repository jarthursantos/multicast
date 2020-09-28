import React from 'react'

import { Container } from './styles'
import { TabContentContainerProps } from './types'

const TabContentContainer: React.VFC<TabContentContainerProps> = ({
  children
}) => {
  return <Container>{children}</Container>
}

export { TabContentContainer }
