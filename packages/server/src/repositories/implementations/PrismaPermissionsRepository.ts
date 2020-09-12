import { PrismaClient } from '@prisma/client'
import { Permissions } from 'entities/Permissions'
import { IPermissionsRepository } from 'repositories/IPermissionsRepository'

export class PrismaPermissionsRepository implements IPermissionsRepository {
  private prisma = new PrismaClient()

  async findByTitle(title: string): Promise<Permissions> {
    const permissions = await this.prisma.permissions.findOne({
      where: { title }
    })

    if (!permissions) {
      return undefined
    }

    return new Permissions(permissions, permissions.id)
  }

  async save(permissions: Permissions): Promise<void> {
    await this.prisma.permissions.create({ data: permissions })
  }

  async findMany(): Promise<Permissions[]> {
    const permissions = await this.prisma.permissions.findMany({
      orderBy: { createdAt: 'asc' }
    })

    const result: Permissions[] = []

    permissions.forEach(permission =>
      result.push(new Permissions(permission, permission.id))
    )

    return result
  }

  async findById(id: string): Promise<Permissions | undefined> {
    const permissions = await this.prisma.permissions.findOne({ where: { id } })

    if (!permissions) {
      return undefined
    }

    return new Permissions(permissions, permissions.id)
  }

  async update(permissions: Permissions): Promise<Permissions> {
    const updatedPermissions = await this.prisma.permissions.update({
      where: { id: permissions.id },
      data: permissions
    })

    return new Permissions(updatedPermissions, updatedPermissions.id)
  }
}
