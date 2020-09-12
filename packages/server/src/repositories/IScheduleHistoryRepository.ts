import { Schedule } from 'entities/Schedule'
import { ScheduleHistory } from 'entities/ScheduleHistory'
import { User } from 'entities/User'

export interface IScheduleHistoryRepository {
  findHistory(schedule: Schedule): Promise<ScheduleHistory[]>
  logStore(changedBy: User, storedSchedule: Schedule): Promise<void>
  logUpdate(
    changedBy: User,
    oldSchedule: Schedule,
    newSchedule: Schedule
  ): Promise<void>
}
