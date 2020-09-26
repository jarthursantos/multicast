export enum Types {
  LOG_IN_REQUEST = '@auth/LOG_IN_REQUEST',
  LOG_IN_SUCCESS = '@auth/LOG_IN_SUCCESS',
  LOG_IN_FAILURE = '@auth/LOG_IN_FAILURE',
  LOG_OUT = '@auth/LOG_OUT'
}

export interface LogInRequestAction {
  type: typeof Types.LOG_IN_REQUEST
  payload: {
    credentials: Credentials
  }
}

export interface LogInSuccessAction {
  type: typeof Types.LOG_IN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export interface LogInFailureAction {
  type: typeof Types.LOG_IN_FAILURE
}

export interface LogOutAction {
  type: typeof Types.LOG_OUT
}

export type AuthActionTypes =
  | LogInFailureAction
  | LogInRequestAction
  | LogInSuccessAction
  | LogOutAction

export interface Credentials {
  email: string
  password: string
  keepConnected: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}

export interface AuthState {
  user?: User
  signed?: boolean
  loading?: boolean
  token?: string
}
