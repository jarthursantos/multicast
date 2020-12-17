import { all } from 'redux-saga/effects'

import scheduleRequests from './schedule-requests/sagas'
import schedules from './schedules/sagas'

export default function* rootSaga() {
  return yield all([scheduleRequests, schedules])
}
