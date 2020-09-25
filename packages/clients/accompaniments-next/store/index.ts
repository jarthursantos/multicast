import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import createStore from './createStore'
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import persistReducers from './persistReducers'
import { RootState } from './state'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store = createStore(persistReducers(rootReducer), middlewares)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export { persistor, store, useTypedSelector }
