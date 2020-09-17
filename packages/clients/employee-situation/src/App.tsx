import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </HashRouter>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
