import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

import { ThemeProvider } from 'styled-components'

import { GlobalStyle, Themes, selectTheme } from '@shared/web-styles'

import Home from './pages/Home'

const App = () => {
  return (
    <ThemeProvider theme={selectTheme(Themes.LIGHT)}>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
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
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
