import { IInvoice } from '~/domain/IInvoice'

export interface IScheduleInvoicesModel {
  findInvoicesOfSchedule(id: string): Promise<IInvoice[]>
}
