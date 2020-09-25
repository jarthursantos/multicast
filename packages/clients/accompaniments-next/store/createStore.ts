import { createStore, applyMiddleware } from 'redux'

export default (reducers: any, middlewares: any) => {
  const applyedMiddlewares = applyMiddleware(...middlewares)

  return createStore(reducers, applyedMiddlewares)
}
