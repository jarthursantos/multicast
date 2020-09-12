import { User } from 'entities/User'
import { UserHistory } from 'entities/UserHistory'
import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'
import { UserHistorySchema } from 'schemas/UserHistorySchema'
import { extractDifferences, hasDifferences } from 'utils/extract-diff'

export class MongoUserHistoryRepository implements IUsersHistoryRepository {
  constructor(private userRepository: IUsersRepository) {}

  async logStore(changedBy: User, storedUser: User): Promise<void> {
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
  }

  async logUpdate(
    changedBy: User,
    oldUser: User,
    newUser: User
  ): Promise<void> {
    const changes = extractDifferences(newUser, oldUser, ['updatedAt'])

    if (hasDifferences(changes)) {
      await UserHistorySchema.create({
        user: changedBy.id,
        changedUser: newUser.id,
        changes
      })
    }
  }

  async findHistory(user: User): Promise<UserHistory[]> {
    const histories = await UserHistorySchema.find({ changedUser: user.id })
      .select(['-_id', '-__v', '-changedUser'])
      .sort({ createdAt: 'asc' })

    const result: UserHistory[] = []

    for (let index = 0; index < histories.length; index++) {
      const history = histories[index]

      const user = await this.userRepository.findById(history.user)

      delete user.password

      result.push({ ...history.toJSON(), user })
    }

    return result
  }

  async logDisabled(changedBy: User, user: User): Promise<void> {
    await UserHistorySchema.create({
      user: changedBy.id,
      changedUser: user.id,
      changes: {
        disabledAt: {
          from: null,
          to: new Date()
        }
      }
    })
  }

  async logEnabled(changedBy: User, user: User): Promise<void> {
    await UserHistorySchema.create({
      user: changedBy.id,
      changedUser: user.id,
      changes: {
        disabledAt: {
          from: user.disabledAt,
          to: null
        }
      }
    })
  }
}
