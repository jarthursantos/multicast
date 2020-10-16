import { Permissions } from 'entities/Permissions'
import { User } from 'entities/User'

declare module 'express' {
  export interface Request {
    auth: {
      user: User
      permissions: Permissions
    }
  }
}
