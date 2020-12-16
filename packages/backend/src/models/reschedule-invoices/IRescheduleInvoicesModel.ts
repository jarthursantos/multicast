import { IInvoice } from '~/domain/IInvoice'

export interface IRescheduleInvoicesModel {
  reschedule(invoices: IInvoice[], scheduleId: string): Promise<IInvoice[]>
}
