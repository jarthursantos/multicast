import { Role } from '@prisma/client'

export interface ICreateUserDTO {
  name: string
  email: string
  role: Role
  permissionsId?: string
}
