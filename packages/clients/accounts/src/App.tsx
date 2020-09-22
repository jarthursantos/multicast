import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

import { ThemeProvider } from 'styled-components'

import { AxiosContext } from '@shared/axios'
import { GlobalStyle, Themes, selectTheme } from '@shared/web-styles'

import AuthPage from '~/pages/Auth'
import SettingsPage from '~/pages/Settings'

const App = () => {
  return (
    <AxiosContext.Provider value={{ baseURL: 'http://192.168.1.2:3340' }}>
      <ThemeProvider theme={selectTheme(Themes.LIGHT)}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={AuthPage} />
            <Route path="/settings" exact component={SettingsPage} />
          </Switch>

          <GlobalStyle />

          <ToastContainer
            position="bottom-center"
            closeButton={false}
            autoClose={3000}
            transition={Slide}
            style={{ marginBottom: -24 }}
            newestOnTop
          />
        </HashRouter>
      </ThemeProvider>
    </AxiosContext.Provider>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
