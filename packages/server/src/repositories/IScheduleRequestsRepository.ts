import { ScheduleRequest } from 'entities/ScheduleRequest'

export interface IScheduleRequestsRepository {
  save(data: ScheduleRequest): Promise<void>
  update(data: ScheduleRequest): Promise<void>
  findMany(): Promise<ScheduleRequest[]>
  findFromDay(day: Date): Promise<ScheduleRequest[]>
  findById(id: string): Promise<ScheduleRequest | undefined>
  remove(id: string): Promise<void>
  attachToSchedule(id: string, scheduleId: string): Promise<void>
}
