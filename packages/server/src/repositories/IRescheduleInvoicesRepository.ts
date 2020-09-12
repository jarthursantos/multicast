import { Invoice } from 'entities/Invoice'

export interface IRescheduleInvoicesRepository {
  reschedule(invoices: Invoice[], scheduleId: string): Promise<Invoice[]>
}
