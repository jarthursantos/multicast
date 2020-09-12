import { Schedule } from 'entities/Schedule'
import { ScheduleHistory } from 'entities/ScheduleHistory'
import { User } from 'entities/User'
import { IUsersRepository } from 'repositories/IUserRepository'
import { ScheduleHistorySchema } from 'schemas/ScheduleHistorySchema'
import { extractDifferences, hasDifferences } from 'utils/extract-diff'

import { IScheduleHistoryRepository } from '../IScheduleHistoryRepository'

export class MongoScheduleHistoryRepository
  implements IScheduleHistoryRepository {
  constructor(private userRepository: IUsersRepository) {}

  async findHistory(schedule: Schedule): Promise<ScheduleHistory[]> {
    const histories = await ScheduleHistorySchema.find({
      changedUser: schedule.id
    })
      .select(['-_id', '-__v', '-changedUser'])
      .sort({ createdAt: 'asc' })

    const result: ScheduleHistory[] = []

    for (let index = 0; index < histories.length; index++) {
      const history = histories[index]

      const user = await this.userRepository.findById(history.user)

      delete user.password

      result.push({ ...history.toJSON(), user })
    }

    return result
  }

  async logStore(changedBy: User, storedSchedule: Schedule): Promise<void> {
    this.logUpdate(
      changedBy,
      {
        id: undefined,
        scheduledAt: null,
        shippingName: undefined,
        priority: undefined,
        freightType: undefined,
        vehicleType: undefined,
        lecturer: undefined,
        driver: undefined,
        vehicleSize: undefined,
        chargeType: undefined,
        palletized: undefined,
        assistant: undefined,
        pipeSize: undefined,
        receiptPerInvoice: undefined,
        dischargeValue: undefined,
        receiptValue: undefined,
        paymentMethod: undefined,
        closedAt: null,
        receivedAt: null,
        rescheduledAt: null,
        createdAt: null,
        updatedAt: null,
        canceledAt: null,
        motive: undefined,
        dischargeTable: undefined,
        invoices: undefined,
        situation: undefined,
        scheduleRequest: undefined,
        totalWeight: undefined,
        totalVolume: undefined,
        rescheduledTo: undefined,
        rescheduledFrom: undefined
      },
      storedSchedule
    )
  }

  async logUpdate(
    changedBy: User,
    oldSchedule: Schedule,
    newSchedule: Schedule
  ): Promise<void> {
    const changes = extractDifferences(newSchedule, oldSchedule, ['updatedAt'])

    if (hasDifferences(changes)) {
      await ScheduleHistorySchema.create({
        user: changedBy.id,
        changedSchedule: newSchedule.id,
        changes
      })
    }
  }
}
