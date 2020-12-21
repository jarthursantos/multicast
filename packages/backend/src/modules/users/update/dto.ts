import { Role } from '@prisma/client'

export interface IUpdateUserDTO {
  name?: string
  email?: string
  role?: Role
  permissionsId?: string
}
