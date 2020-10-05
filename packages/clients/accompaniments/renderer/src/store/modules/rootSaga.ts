import { all } from 'redux-saga/effects'

import accompaniments from './accompaniments/sagas'

export default function* rootSaga() {
  return yield all([accompaniments])
}
