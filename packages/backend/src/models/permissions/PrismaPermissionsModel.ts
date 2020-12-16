import { PrismaClient } from '@prisma/client'

import { IPermissions, createPermissions } from '~/domain/IPermissions'

import { IPermissionsModel } from './IPermissionsModel'

export function createPrismaPermissionsModel(): IPermissionsModel {
  const prisma = new PrismaClient()

  return {
    findByTitle: async (title: string) => {
      const permissions = await prisma.permissions.findOne({
        where: { title }
      })

      if (!permissions) {
        return undefined
      }

      return createPermissions(permissions, permissions.id)
    },

    save: async (permissions: IPermissions): Promise<void> => {
      await prisma.permissions.create({ data: permissions })
    },

    findMany: async (): Promise<IPermissions[]> => {
      const permissions = await prisma.permissions.findMany({
        orderBy: { createdAt: 'asc' }
      })

      const result: IPermissions[] = []

      permissions.forEach(permission =>
        result.push(createPermissions(permission, permission.id))
      )

      return result
    },

    findById: async (id: string): Promise<IPermissions | undefined> => {
      const permissions = await prisma.permissions.findOne({ where: { id } })

      if (!permissions) {
        return undefined
      }

      return createPermissions(permissions, permissions.id)
    },

    update: async (permissions: IPermissions): Promise<IPermissions> => {
      const updatedPermissions = await prisma.permissions.update({
        where: { id: permissions.id },
        data: permissions
      })

      return createPermissions(updatedPermissions, updatedPermissions.id)
    }
  }
}
