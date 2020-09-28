import { User } from '@shared/web-pages'

import { LogInSuccessAction, Types, LogOutAction } from './types'

export function logInSuccess(user: User, token: string): LogInSuccessAction {
  return {
    propagate: true,
    type: Types.LOG_IN_SUCCESS,
    payload: { user, token }
  }
}

export function logOut(): LogOutAction {
  return {
    propagate: true,
    type: Types.LOG_OUT
  }
}
