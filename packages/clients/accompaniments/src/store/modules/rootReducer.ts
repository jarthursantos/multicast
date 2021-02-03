import { combineReducers } from 'redux'

import accompaniments from './accompaniments/reducer'
import agenda from './agenda/reducer'
import auth from './auth/reducer'
import preferences from './preferences/reducer'

export default combineReducers({
  accompaniments,
  agenda,
  auth,
  preferences
})
