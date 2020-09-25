import React from 'react'
import { Provider } from 'react-redux'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react'

import { AxiosContext } from '@shared/axios'

import { store, persistor } from '../../store'

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
        <title>FollowUP</title>
      </Head>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AxiosContext.Provider value={{ baseURL: 'http://192.168.1.2:3340' }}>
            <Component {...pageProps} />
          </AxiosContext.Provider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  )
}