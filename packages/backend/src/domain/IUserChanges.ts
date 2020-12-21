import { Role } from '@prisma/client'

import { IChange } from './IChange'
import { IUser } from './IUser'

export interface IUserChanges {
  user: IUser
  name?: IChange<string>
  email?: IChange<string>
  role?: IChange<Role>
  disabledAt?: IChange<Date>
}

export function createUserChanges(
  user: IUser,
  props: Omit<IUserChanges, 'user'>
): IUserChanges {
  return {
    user,
    name: props.name,
    email: props.email,
    role: props.role,
    disabledAt: props.disabledAt
  }
}
