import { InvoiceSituations } from 'entities/InvoiceSituations'

export interface IInvoiceSituationsRepository {
  find(
    providerCode: number,
    invoiceNumber: number,
    canceledAt?: Date
  ): Promise<InvoiceSituations>
}
