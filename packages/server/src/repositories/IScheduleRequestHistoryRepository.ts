import { ScheduleRequest } from 'entities/ScheduleRequest'
import { ScheduleRequestHistory } from 'entities/ScheduleRequestHistory'
import { User } from 'entities/User'

export interface IScheduleRequestHistoryRepository {
  findHistory(request: ScheduleRequest): Promise<ScheduleRequestHistory[]>
  logStore(changedBy: User, storedRequest: ScheduleRequest): Promise<void>
  logUpdate(
    changedBy: User,
    oldRequest: ScheduleRequest,
    newRequest: ScheduleRequest
  ): Promise<void>
}
