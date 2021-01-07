import { User } from '@shared/web-pages'

import {
  ILogInSuccessAction,
  ILogOutAction,
  ISetAuthTokenAction,
  Types
} from './types'

export function logInSuccess(user: User, token: string): ILogInSuccessAction {
  return {
    propagate: true,
    type: Types.LOG_IN_SUCCESS,
    payload: { user, token }
  }
}

export function logOut(): ILogOutAction {
  return {
    propagate: true,
    type: Types.LOG_OUT
  }
}

export function setAuthToken(token: string): ISetAuthTokenAction {
  return {
    type: Types.SET_AUTH_TOKEN,
    payload: { token }
  }
}
