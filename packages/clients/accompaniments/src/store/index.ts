import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import createStore from '~/store/createStore'
import rootReducer from '~/store/modules/rootReducer'
import rootSaga from '~/store/modules/rootSaga'
import persistReducers from '~/store/persistReducers'
import { replyActions } from '~/store/replyActions'
import { RootState } from '~/store/state'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [replyActions, sagaMiddleware]

const store = createStore(persistReducers(rootReducer), middlewares)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export { persistor, store, useTypedSelector }
