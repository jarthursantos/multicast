import { Invoice } from 'entities/Invoice'
import { InvoiceHistory } from 'entities/InvoiceHistory'
import { User } from 'entities/User'

export interface IInvoiceHistoryRepository {
  findHistory(invoice: Invoice): Promise<InvoiceHistory[]>
  logStore(changedBy: User, storedInvoice: Invoice): Promise<void>
  logUpdate(
    changedBy: User,
    oldInvoice: Invoice,
    newInvoice: Invoice
  ): Promise<void>
}
