import { IInvoiceProduct } from '~/domain/IInvoiceProduct'

export interface IInvoiceProductsModel {
  findLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<IInvoiceProduct[]>
  findPreLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<IInvoiceProduct[]>
}
