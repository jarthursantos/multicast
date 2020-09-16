import { Schedule } from 'entities/Schedule'

export interface ISchedulesRepository {
  save(schedule: Schedule): Promise<void>
  findMany(): Promise<Schedule[]>
  findReceivedsFromPeriod(
    periodStart: Date,
    periodEnd: Date
  ): Promise<Schedule[]>
  findById(id: string): Promise<Schedule | undefined>
  update(data: Schedule): Promise<Schedule>
  cancel(id: string, motive: string): Promise<Schedule>
  addInvoice(id: string, invoiceId: string): Promise<void>
  close(schedule: Schedule): Promise<Schedule>
}
