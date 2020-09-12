import { Invoice } from 'entities/Invoice'

export interface IInvoicesRepository {
  save(invoice: Invoice): Promise<void>
  find(number: number, providerCode: number): Promise<Invoice[]>
  cancel(id: string): Promise<void>
  findById(id: string): Promise<Invoice | undefined>
  update(invoice: Invoice): Promise<Invoice>
}
