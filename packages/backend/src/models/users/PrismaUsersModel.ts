import { PrismaClient } from '@prisma/client'
import { generate as generatePassword } from 'generate-password'
import { omit } from 'lodash'

import { IUser, createUser } from '~/domain/IUser'

import { IUsersModel } from './IUsersModel'

export function createPrismaUsersModel(): IUsersModel {
  const prisma = new PrismaClient()

  return {
    async findByEmail(email: string): Promise<IUser | undefined> {
      const user = await prisma.users.findUnique({ where: { email } })

      if (!user) {
        return undefined
      }

      return createUser(user, user.id)
    },

    async save(user: IUser): Promise<void> {
      await prisma.users.create({
        data: {
          ...omit(user, 'permissionsId'),
          password: user.password || generatePassword({ length: 8 }),
          permissions: user.permissionsId
            ? { connect: { id: user.permissionsId } }
            : undefined
        }
      })
    },

    async findMany(): Promise<IUser[]> {
      const users = await prisma.users.findMany({
        include: { permissions: true },
        orderBy: { createdAt: 'asc' }
      })

      const result: IUser[] = []

      users.forEach(user => result.push(createUser(user, user.id)))

      return result
    },

    async findById(id: string): Promise<IUser | undefined> {
      const user = await prisma.users.findUnique({
        where: { id },
        include: { permissions: true }
      })

      if (!user) {
        return undefined
      }

      return createUser(user, user.id)
    },

    async disable(user: IUser): Promise<void> {
      await prisma.users.update({
        where: { id: user.id },
        data: { disabledAt: new Date() }
      })
    },

    async enable(user: IUser): Promise<void> {
      await prisma.users.update({
        where: { id: user.id },
        data: { disabledAt: null }
      })
    },

    async update(user: IUser): Promise<IUser> {
      const updatedUser = await prisma.users.update({
        where: { id: user.id },
        include: { permissions: true },
        data: {
          ...omit(user, 'permissionsId'),
          permissions: user.permissionsId
            ? { connect: { id: user.permissionsId } }
            : undefined
        }
      })

      return createUser(updatedUser, updatedUser.id)
    }
  }
}
