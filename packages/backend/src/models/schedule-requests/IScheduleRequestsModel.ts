import { IScheduleRequest } from '~/domain/IScheduleRequest'

export interface IScheduleRequestsModel {
  save(data: IScheduleRequest): Promise<void>
  update(data: IScheduleRequest): Promise<void>
  findMany(): Promise<IScheduleRequest[]>
  findFromDay(day: Date): Promise<IScheduleRequest[]>
  findById(id: string): Promise<IScheduleRequest | undefined>
  remove(id: string): Promise<void>
  attachToSchedule(id: string, scheduleId: string): Promise<void>
}
