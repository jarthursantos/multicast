export interface Props {
  title: string
  version: string
  icon: string
  credentials?: PartialCredentials
  onLogInSuccess(credentials: Credentials, user: User): void
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
