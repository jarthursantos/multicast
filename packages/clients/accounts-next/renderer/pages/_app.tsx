import React from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { AxiosContext } from '@shared/axios'
import { GlobalStyle } from '@shared/web-styles'

export default function (props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>with-typescript-material-ui</title>
      </Head>
      <AxiosContext.Provider value={{ baseURL: 'https://api.github.com' }}>
        <Component {...pageProps} />

        <GlobalStyle />
      </AxiosContext.Provider>
    </React.Fragment>
  )
}
