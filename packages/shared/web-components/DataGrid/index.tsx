import React from 'react'

import Body from './Body'
import { GridContextProvider } from './context'
import Footer from './Footer'
import Header from './Header'
import { Wrapper } from './styles'
import { DataGridProps } from './types'

function DataGrid<Data>({ style, ...rest }: DataGridProps<Data>) {
  return (
    <GridContextProvider {...rest}>
      <Wrapper style={style}>
        <Header />

        <Body />

        <Footer />
      </Wrapper>
    </GridContextProvider>
  )
}

export { DataGrid }
