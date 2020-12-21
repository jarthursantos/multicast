import { IInvoice } from '~/domain/IInvoice'
import { ISchedule } from '~/domain/ISchedule'

export interface IInvoicesModel {
  save(invoice: IInvoice): Promise<void>
  find(number: number, providerCode: number): Promise<IInvoice[]>
  cancel(id: string): Promise<void>
  findById(id: string): Promise<IInvoice | undefined>
  update(invoice: IInvoice): Promise<IInvoice>
  delete(id: string): Promise<void>
  move(id: string, schedule: ISchedule): Promise<void>
}
