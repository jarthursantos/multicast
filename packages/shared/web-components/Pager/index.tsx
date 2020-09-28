import React from 'react'

import { PagerContextProvider } from './context'
import Page from './Page'
import { Container } from './styles'
import { PagerProps } from './types'

const Pager: React.VFC<PagerProps> & {
  Page: typeof Page
} = ({ children, currentPage }) => {
  return (
    <PagerContextProvider currentPage={currentPage}>
      <Container>{children}</Container>
    </PagerContextProvider>
  )
}

Pager.Page = Page

export { Pager }
