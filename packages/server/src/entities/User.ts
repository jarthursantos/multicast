import { Role } from '@prisma/client'
import { generate as generatePassword } from 'generate-password'
import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class User {
  public readonly id: string

  public name: string
  public email: string
  public password: string
  public role: Role
  public permissionsId?: string
  public disabledAt?: Date

  public createdAt?: Date
  public updatedAt?: Date

  constructor(
    props: Omit<User, 'id' | 'password'> & { password?: string },
    id?: string
  ) {
    Object.assign(
      this,
      pick(
        props,
        'name',
        'email',
        'password',
        'role',
        'permissionsId',
        'disabledAt',
        'createdAt',
        'updatedAt'
      )
    )

    this.id = id || uuid()

    this.password = this.password || generatePassword({ length: 8 })

    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }
}
