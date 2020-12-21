export interface AuthProps {
  title: string
  version: string
  icon: string
  credentials?: Partial<Credentials>
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

export interface User {
  name: string
  email: string
  password: string
  role: Roles
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
