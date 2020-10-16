import React, { useCallback, useState } from 'react'

import Body from './Body'
import { GridContextProvider, useColumnsHeader } from './context'
import Footer from './Footer'
import Header from './Header'
import {
  Wrapper,
  TopSeparator,
  BottomSeparator,
  HeaderWrapper,
  FooterWrapper,
  BodyWrapper
} from './styles'
import { GridProps, DataGridProps } from './types'

function Grid({ style }: GridProps) {
  const columns = useColumnsHeader()

  const [bodyRef, setBodyRef] = useState<HTMLElement | undefined>()
  const [headerRef, setHeaderRef] = useState<HTMLElement | undefined>()
  const [footerRef, setFooterRef] = useState<HTMLElement | undefined>()

  const scrollX = useCallback(
    (container: HTMLElement) => {
      bodyRef?.scrollTo({ left: container.scrollLeft })
      headerRef?.scrollTo({ left: container.scrollLeft })
      footerRef?.scrollTo({ left: container.scrollLeft })
    },
    [bodyRef, headerRef, footerRef]
  )

  return (
    <Wrapper {...style} style={style} columns={columns}>
      <HeaderWrapper containerRef={setHeaderRef} onScrollX={scrollX}>
        <Header />
      </HeaderWrapper>

      <TopSeparator />

      <BodyWrapper containerRef={setBodyRef} onScrollX={scrollX}>
        <Body />
      </BodyWrapper>

      <BottomSeparator />

      <FooterWrapper containerRef={setFooterRef} onScrollX={scrollX}>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  )
}

function DataGrid<Data>({ style, ...rest }: DataGridProps<Data>) {
  return (
    <GridContextProvider {...rest}>
      <Grid style={style} />
    </GridContextProvider>
  )
}

export { DataGrid }
