import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default (reducers: any) => {
  const persistedReducer = persistReducer(
    {
      storage,
      key: 'accompaniments',
      whitelist: ['auth', 'preferences']
    },
    reducers
  )

  return persistedReducer
}
