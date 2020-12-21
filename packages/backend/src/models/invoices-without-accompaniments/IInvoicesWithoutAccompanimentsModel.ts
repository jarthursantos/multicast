import { IAccompaniment } from '~/domain/IAccompaniment'
import { IInvoiceBase } from '~/domain/IInvoice'

export interface IInvoicesWithoutAccompanimentsModel {
  findMany(accompaniment: IAccompaniment): Promise<IInvoiceBase[]>
  findByTransaction(transaction: number): Promise<IInvoiceBase>
  findByInvoice(number: number, providerCode: number): Promise<IInvoiceBase>
}
