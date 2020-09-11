import React, { useCallback } from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { ipcRenderer } from 'electron'

const App = () => {
  const handleOpenAbout = useCallback(() => {
    ipcRenderer.send('openAbout')
  }, [])

  return (
    <HashRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <h2 onClick={handleOpenAbout}>Home</h2>}
        />
        <Route path="/about" exact component={() => <h2>About</h2>} />
      </Switch>
    </HashRouter>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)
