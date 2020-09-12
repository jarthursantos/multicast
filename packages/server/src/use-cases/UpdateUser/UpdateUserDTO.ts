import { Role } from '@prisma/client'

export interface IUpdateUserRequestDTO {
  name?: string
  email?: string
  role?: Role
  permissionsId?: string
}
