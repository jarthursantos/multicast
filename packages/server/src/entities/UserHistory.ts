import { Role } from '@prisma/client'
import { pick } from 'lodash'

import { Change } from './Change'
import { User } from './User'

export class UserHistory {
  public user: User
  public name?: Change<string>
  public email?: Change<string>
  public role?: Change<Role>
  public disabledAt?: Change<Date>

  constructor(user: User, data: Omit<UserHistory, 'user'>) {
    Object.assign(this, pick(data, 'name', 'email', 'role', 'disabledAt'))

    this.user = user
  }
}
