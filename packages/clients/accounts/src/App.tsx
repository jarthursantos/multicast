import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import AuthPage from './pages/Auth'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={AuthPage} />
      </Switch>
    </HashRouter>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
