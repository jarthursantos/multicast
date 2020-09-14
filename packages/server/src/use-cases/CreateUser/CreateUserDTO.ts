import { Role } from '@prisma/client'

export interface ICreateUserRequestDTO {
  name: string
  email: string
  role: Role
  permissionsId?: string
}
