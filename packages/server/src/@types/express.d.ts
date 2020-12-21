import { Permissions } from 'entities/Permissions'
import { User } from 'entities/User'

declare global {
  namespace Express {
    interface Request {
      auth: {
        user: User
        permissions: Permissions
      }
    }
  }
}

// declare module 'express' {
//   export interface Request {
//     auth: {
//       user: User
//       permissions: Permissions
//     }
//   }
// }
