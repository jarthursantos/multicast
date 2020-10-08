import { Accompaniment } from 'entities/Accompaniment'
import { InvoiceBase } from 'entities/Invoice'

export interface IInvoicesWithoutAccompanimentsRepository {
  findMany(accompaniment: Accompaniment): Promise<InvoiceBase[]>
}
