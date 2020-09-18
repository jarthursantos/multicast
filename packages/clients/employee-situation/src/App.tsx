import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

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
      </HashRouter>
    </ThemeProvider>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
