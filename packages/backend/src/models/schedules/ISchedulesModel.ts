import { ISchedule } from '~/domain/ISchedule'

export interface IFindManyOptions {
  year: number
  month: number
}

export interface ISchedulesModel {
  save(schedule: ISchedule): Promise<void>
  findMany(options?: IFindManyOptions): Promise<ISchedule[]>
  findReceivedsFromPeriod(
    periodStart: Date,
    periodEnd: Date
  ): Promise<ISchedule[]>
  findById(id: string): Promise<ISchedule | undefined>
  update(data: ISchedule): Promise<ISchedule>
  cancel(id: string, motive: string): Promise<ISchedule>
  addInvoice(id: string, invoiceId: string): Promise<void>
  close(schedule: ISchedule): Promise<ISchedule>
  delete(id: string): Promise<void>
  search(scheduledAt: Date, criteria?: string): Promise<ISchedule[]>
}
