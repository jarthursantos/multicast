import React from 'react'

import { TabBar } from '../TabBar'
import { TabContent } from '../TabContent'
import { TabContentContainer } from '../TabContentContainer'
import { TabOptions } from '../TabOptions'
import { RibbonContextProvider } from './context'
import { Container } from './styles'

const Ribbon: React.FC & {
  Bar: typeof TabBar
  Container: typeof TabContentContainer
  Options: typeof TabOptions
  Content: typeof TabContent
} = ({ children }) => {
  return (
    <RibbonContextProvider>
      <Container>{children}</Container>
    </RibbonContextProvider>
  )
}

Ribbon.Bar = TabBar
Ribbon.Options = TabOptions
Ribbon.Container = TabContentContainer
Ribbon.Content = TabContent

export { Ribbon }
