import { all } from 'redux-saga/effects'

import accompaniments from './accompaniments/sagas'
import agenda from './agenda/sagas'

export default function* rootSaga() {
  return yield all([accompaniments, agenda])
}
