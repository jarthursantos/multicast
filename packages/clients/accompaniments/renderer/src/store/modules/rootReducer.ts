import { combineReducers } from 'redux'

import auth from './auth/reducer'
import preferences from './preferences/reducer'

export default combineReducers({
  auth,
  preferences
})
