import { all } from 'redux-saga/effects'

import accompaniments from './accompaniments/sagas'
import agenda from './agenda/sagas'
import billsToPay from './billsToPay/sagas'

export default function* rootSaga() {
  return yield all([accompaniments, agenda, billsToPay])
}
