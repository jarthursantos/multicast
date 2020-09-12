import { PrismaClient } from '@prisma/client'
import { User } from 'entities/User'
import { omit } from 'lodash'
import { IUsersRepository } from 'repositories/IUserRepository'

export class PrismaUsersRepository implements IUsersRepository {
  private prisma = new PrismaClient()

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.users.findOne({ where: { email } })

    if (!user) {
      return undefined
    }

    return new User(user, user.id)
  }

  async save(user: User): Promise<void> {
    await this.prisma.users.create({
      data: {
        ...omit(user, 'permissionsId'),
        permissions: user.permissionsId
          ? { connect: { id: user.permissionsId } }
          : undefined
      }
    })
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.users.findMany({
      include: { permissions: true },
      orderBy: { createdAt: 'asc' }
    })

    const result: User[] = []

    users.forEach(user => result.push(new User(user, user.id)))

    return result
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.users.findOne({
      where: { id },
      include: { permissions: true }
    })

    if (!user) {
      return undefined
    }

    return new User(user, user.id)
  }

  async disable(user: User): Promise<void> {
    await this.prisma.users.update({
      where: { id: user.id },
      data: { disabledAt: new Date() }
    })
  }

  async enable(user: User): Promise<void> {
    await this.prisma.users.update({
      where: { id: user.id },
      data: { disabledAt: null }
    })
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.users.update({
      where: { id: user.id },
      include: { permissions: true },
      data: {
        ...omit(user, 'permissionsId'),
        permissions: user.permissionsId
          ? { connect: { id: user.permissionsId } }
          : undefined
      }
    })

    return new User(updatedUser, updatedUser.id)
  }
}
