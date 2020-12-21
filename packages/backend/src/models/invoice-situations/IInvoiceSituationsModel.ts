import { InvoiceSituations } from '~/domain/InvoiceSituations'

export interface IInvoiceSituationsModel {
  find(
    providerCode: number,
    invoiceNumber: number,
    importation: boolean,
    canceledAt?: Date
  ): Promise<InvoiceSituations>
}
