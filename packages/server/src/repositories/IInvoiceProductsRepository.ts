import { InvoiceProduct } from 'entities/InvoiceProduct'

export interface IInvoiceProductsRepository {
  findLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<InvoiceProduct[]>
  findPreLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<InvoiceProduct[]>
}
