import { User } from '@shared/web-pages'

import { BaseAction } from '../types'

export enum Types {
  LOG_IN_SUCCESS = '@auth/LOG_IN_SUCCESS',
  LOG_OUT = '@auth/LOG_OUT'
}

export interface LogInSuccessAction extends BaseAction {
  type: typeof Types.LOG_IN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export interface LogOutAction extends BaseAction {
  type: typeof Types.LOG_OUT
}

export type AuthActionTypes = LogInSuccessAction | LogOutAction

export interface AuthState {
  user?: User
  signed?: boolean
  token?: string
}
