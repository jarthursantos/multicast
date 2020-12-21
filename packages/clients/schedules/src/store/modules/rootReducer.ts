import { combineReducers } from 'redux'

import auth from './auth/reducer'
import preferences from './preferences/reducer'
import scheduleRequests from './schedule-requests/reducer'
import schedules from './schedules/reducer'

export default combineReducers({
  auth,
  preferences,
  schedules,
  scheduleRequests
})
