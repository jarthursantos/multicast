import { toast } from 'react-toastify'

import { all, takeLatest, put } from 'redux-saga/effects'

import { extractErrorMessage } from '@shared/axios'

import { logInFailure, logInSuccess } from './actions'
import { LogInRequestAction, Types } from './types'

export function* logIn({ payload }: LogInRequestAction) {
  try {
    const { email } = payload.credentials // , password, keepConnected

    // const response = yield call(api.post, 'sessions', { email, password })
    // const { user, token }: { user: User; token: string } = response.data

    yield put(
      logInSuccess({ email, id: '', name: 'Arthur', role: 'ADMIN' }, 'token')
    )

    // yield put(keepConnectedRequest(keepConnected))
  } catch (err) {
    const message = extractErrorMessage(err)
    toast.error(message)

    yield put(logInFailure())
  }
}

export default all([takeLatest(Types.LOG_IN_REQUEST, logIn)])
