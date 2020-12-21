import { IUser } from '~/domain/IUser'
import { IUserChanges } from '~/domain/IUserChanges'
import { UserChangesSchema } from '~/entities/UserChanges'
import {
  extractDifferences,
  hasDifferences
} from '~/utilities/object-differences'

import { IUsersModel } from '../IUsersModel'
import { IUserChangesModel } from './IUserChangesModel'

export function createMongoUserChangesModel(
  usersModel: IUsersModel
): IUserChangesModel {
  return {
    async findHistory(user: IUser): Promise<IUserChanges[]> {
      const histories = await UserChangesSchema.find({ changedUser: user.id })
        .select(['-_id', '-__v', '-changedUser'])
        .sort({ createdAt: 'asc' })

      const result: IUserChanges[] = []

      for (let index = 0; index < histories.length; index++) {
        const history = histories[index]

        const historyUser = await usersModel.findById(history.user)

        delete historyUser?.password

        result.push({ ...history.toJSON(), user: historyUser })
      }

      return result
    },

    async logStore(changedBy: IUser, storedUser: IUser): Promise<void> {
      this.logUpdate(
        changedBy,
        {
          id: undefined,
          name: undefined,
          email: undefined,
          password: undefined,
          role: undefined
        },
        storedUser
      )
    },

    async logUpdate(
      changedBy: IUser,
      oldUser: Partial<IUser>,
      newUser: IUser
    ): Promise<void> {
      const changes = extractDifferences(newUser, oldUser, ['updatedAt'])

      if (hasDifferences(changes)) {
        await UserChangesSchema.create({
          user: changedBy.id,
          changedUser: newUser.id,
          changes
        })
      }
    },

    async logDisabled(changedBy: IUser, user: IUser): Promise<void> {
      await UserChangesSchema.create({
        user: changedBy.id,
        changedUser: user.id,
        changes: {
          disabledAt: {
            from: undefined,
            to: new Date()
          }
        }
      })
    },

    async logEnabled(changedBy: IUser, user: IUser): Promise<void> {
      await UserChangesSchema.create({
        user: changedBy.id,
        changedUser: user.id,
        changes: {
          disabledAt: {
            from: user.disabledAt || undefined,
            to: undefined
          }
        }
      })
    }
  }
}
