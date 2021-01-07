import { User } from '@shared/web-pages'

import { BaseAction } from '../types'

export enum Types {
  LOG_IN_SUCCESS = '@auth/LOG_IN_SUCCESS',
  LOG_OUT = '@auth/LOG_OUT',
  SET_AUTH_TOKEN = '@auth/SET_AUTH_TOKEN'
}

export interface ILogInSuccessAction extends BaseAction {
  type: typeof Types.LOG_IN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export interface ILogOutAction extends BaseAction {
  type: typeof Types.LOG_OUT
}

export interface ISetAuthTokenAction extends BaseAction {
  type: typeof Types.SET_AUTH_TOKEN
  payload: { token: string }
}

export type AuthActionTypes =
  | ILogInSuccessAction
  | ILogOutAction
  | ISetAuthTokenAction

export interface AuthState {
  user?: User
  signed?: boolean
  token?: string
}
