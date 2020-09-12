import { Role } from '@prisma/client'

export interface ICreateUserRequestDTO {
  name: string
  email: string
  password: string
  role: Role
  permissionsId?: string
}
