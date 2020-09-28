import React from 'react'

import { Container } from './styles'
import { TabOptionsContent } from './TabOptionsContent'
import { TabOptionsProps } from './types'

const TabOptions: React.VFC<TabOptionsProps> & {
  Content: typeof TabOptionsContent
} = ({ children }) => {
  return <Container>{children}</Container>
}

TabOptions.Content = TabOptionsContent

export { TabOptions }
