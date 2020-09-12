import { ScheduleRequest } from 'entities/ScheduleRequest'
import { ScheduleRequestHistory } from 'entities/ScheduleRequestHistory'
import { User } from 'entities/User'
import { IUsersRepository } from 'repositories/IUserRepository'
import { ScheduleRequestHistorySchema } from 'schemas/ScheduleRequestHistorySchema'
import { extractDifferences, hasDifferences } from 'utils/extract-diff'

import { IScheduleRequestHistoryRepository } from '../IScheduleRequestHistoryRepository'

export class MongoScheduleRequestHistoryRepository
  implements IScheduleRequestHistoryRepository {
  constructor(private userRepository: IUsersRepository) {}

  async findHistory(
    request: ScheduleRequest
  ): Promise<ScheduleRequestHistory[]> {
    const histories = await ScheduleRequestHistorySchema.find({
      changedUser: request.id
    })
      .select(['-_id', '-__v', '-changedUser'])
      .sort({ createdAt: 'asc' })

    const result: ScheduleRequestHistory[] = []

    for (let index = 0; index < histories.length; index++) {
      const history = histories[index]

      const user = await this.userRepository.findById(history.user)

      delete user.password

      result.push({ ...history.toJSON(), user })
    }

    return result
  }

  async logStore(
    changedBy: User,
    storedRequest: ScheduleRequest
  ): Promise<void> {
    this.logUpdate(
      changedBy,
      {
        id: undefined,
        providerCode: undefined,
        requestedDate: undefined
      },
      storedRequest
    )
  }

  async logUpdate(
    changedBy: User,
    oldRequest: ScheduleRequest,
    newRequest: ScheduleRequest
  ): Promise<void> {
    const changes = extractDifferences(newRequest, oldRequest, ['updatedAt'])

    if (hasDifferences(changes)) {
      await ScheduleRequestHistorySchema.create({
        user: changedBy.id,
        changedRequest: newRequest.id,
        changes
      })
    }
  }
}
