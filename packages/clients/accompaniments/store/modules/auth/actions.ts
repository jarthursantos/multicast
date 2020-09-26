import {
  Credentials,
  LogInRequestAction,
  LogInFailureAction,
  LogInSuccessAction,
  Types,
  User,
  LogOutAction
} from './types'

export function logInRequest(credentials: Credentials): LogInRequestAction {
  return {
    type: Types.LOG_IN_REQUEST,
    payload: { credentials }
  }
}

export function logInSuccess(user: User, token: string): LogInSuccessAction {
  return {
    type: Types.LOG_IN_SUCCESS,
    payload: { user, token }
  }
}

export function logInFailure(): LogInFailureAction {
  return {
    type: Types.LOG_IN_FAILURE
  }
}

export function logOut(): LogOutAction {
  return {
    type: Types.LOG_OUT
  }
}
