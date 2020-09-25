import { toast } from 'react-toastify'

import { AxiosError } from 'axios'
import { all, takeLatest, put } from 'redux-saga/effects' // call

// import { Types as PersistTypes, ReHydrateSuccessAction } from '../persist/types'
// import { keepConnectedRequest } from '../preferences/actions'
import { logInFailure } from './actions' // logInSuccess
import { LogInRequestAction, Types } from './types' // User

export function* logIn({ payload }: LogInRequestAction) {
  try {
    console.log({ payload })

    // const { email, password, keepConnected } = payload.credentials
    // const response = yield call(api.post, 'sessions', { email, password })
    // const { user, token }: { user: User; token: string } = response.data
    // yield put(logInSuccess(user, token))
    // yield put(keepConnectedRequest(keepConnected))
    // history.push('/home/users')
  } catch (err) {
    const error: AxiosError = err

    if (error.isAxiosError) {
      if (error.response) {
        toast.error(error.response.data.error, { position: 'top-center' })
      } else {
        toast.error('Não foi possível se conectar ao servidor', {
          position: 'top-center'
        })
      }
    } else {
      toast.error('Houve um erro no login, verifique seus dados!', {
        position: 'top-center'
      })
    }

    yield put(logInFailure())
  }
}

// export function setToken({ payload }: ReHydrateSuccessAction) {
//   if (!payload) return

//   const { token } = payload.auth

//   if (token) {
//     setAuthToken(token)
//   }
// }

// export function logOut() {
//   history.push('/')
// }

export default all([
  // takeLatest(PersistTypes.REHYDRATE, setToken),
  takeLatest(Types.LOG_IN_REQUEST, logIn)
  // takeLatest(Types.LOG_OUT, logOut)
])
