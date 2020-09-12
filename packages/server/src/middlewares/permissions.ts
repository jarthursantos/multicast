import { Request, Response } from 'express'

import { Permissions as ClientPermissions } from '@prisma/client'

export type PermissionsGroup = Omit<
  ClientPermissions,
  'id' | 'title' | 'createdAt' | 'updatedAt'
>

export declare type Permissions = {
  [key in keyof PermissionsGroup]: PermissionsGroup[key] extends
    | false
    | undefined
    | null
    ? never
    : key
}[keyof PermissionsGroup]

export function validateUserHavePermission(...permissions: Permissions[]) {
  const userHavePermission = (req: Request, _res: Response, next: Function) => {
    permissions.forEach(permission => {
      const havePermission = req.auth.permissions[permission]

      if (!havePermission) {
        throw new Error('O usuário não tem permissões suficientes')
      }
    })

    return next()
  }

  return userHavePermission
}
