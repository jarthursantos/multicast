import 'chart.js'
import 'chartjs-plugin-labels'

import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer, Slide } from 'react-toastify'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { AxiosContextProvider } from '@shared/axios'
import { GlobalStyle, selectTheme, Themes } from '@shared/web-styles'

import { ReduxActionFromMain } from '~/providers/ReduxActionFromMain'
import { store, persistor } from '~/store'

import '../public/styles/resizable.css'
import '../public/styles/scrollbar.css'
import '../public/styles/toastify.css'

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

        <title>FollowUP Compras</title>
      </Head>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={selectTheme(Themes.LIGHT)}>
            <AxiosContextProvider baseURL="http://192.168.1.16:3333">
              <Component {...pageProps} />

              <GlobalStyle />

              <ToastContainer
                position="bottom-center"
                closeButton={false}
                autoClose={3000}
                transition={Slide}
                style={{ marginBottom: -24 }}
                newestOnTop
              />
            </AxiosContextProvider>
          </ThemeProvider>

          <ReduxActionFromMain />
        </PersistGate>
      </Provider>
    </React.Fragment>
  )
}
