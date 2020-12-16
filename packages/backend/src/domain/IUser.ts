import { Role } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export interface IUser {
  readonly id: string

  name: string
  email: string
  password?: string
  role: Role
  permissionsId?: string | null
  disabledAt?: Date | null

  createdAt?: Date
  updatedAt?: Date
}

export function createUser(
  props: Omit<IUser, 'id' | 'password'> & { password?: string },
  id?: string
): IUser {
  return {
    name: props.name,
    email: props.email,
    role: props.role,
    password: props.password,
    permissionsId: props.permissionsId,
    disabledAt: props.disabledAt,

    id: id || uuid(),

    createdAt: props.createdAt || new Date(),
    updatedAt: props.updatedAt || new Date()
  }
}
