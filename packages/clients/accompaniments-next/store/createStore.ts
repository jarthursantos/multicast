import { ipcRenderer } from 'electron'
import { createStore, applyMiddleware } from 'redux'

export default (reducers: any, middlewares: any) => {
  const applyedMiddlewares = applyMiddleware(
    () => next => action => {
      const replyedAction = { ...action, _alreadyReplyed: true }

      if (action._alreadyReplyed) {
        return next(replyedAction)
      }

      try {
        ipcRenderer.send('redux-action', replyedAction)

        console.log({ action, replyedAction })
      } catch (error) {
        next(action)
      }
    },
    ...middlewares
  )

  return createStore(reducers, {}, applyedMiddlewares)
}
