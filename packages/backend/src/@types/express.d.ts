import { IPermissions } from '~/domain/IPermissions'
import { IUser } from '~/domain/IUser'

declare global {
  namespace Express {
    interface Request {
      auth: {
        user: IUser
        permissions: IPermissions
      }
    }
  }
}
