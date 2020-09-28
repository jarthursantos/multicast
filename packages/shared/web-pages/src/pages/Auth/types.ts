export interface AuthProps {
  title: string
  version: string
  icon: string
  credentials?: PartialCredentials
  onLogInSuccess(credentials: Credentials, data: LoginSuccessData): void
}

export interface LoginSuccessData {
  user: User
  token: string
}

export interface Credentials {
  email: string
  password: string
  keepConnected: boolean
}

export interface PartialCredentials {
  email?: string
  password?: string
  keepConnected?: boolean
}

export interface User {
  name: string
  email: string
  role: Roles
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
