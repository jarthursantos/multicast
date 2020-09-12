import { Invoice } from 'entities/Invoice'

export interface IScheduleInvoicesRepository {
  findInvoicesOfSchedule(id: string): Promise<Invoice[]>
}
