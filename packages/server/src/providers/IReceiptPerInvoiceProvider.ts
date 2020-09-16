import { File } from 'entities/File'
import { Invoice } from 'entities/Invoice'
import { Provider } from 'entities/Provider'
import { Schedule } from 'entities/Schedule'

export type IReceiptPerInvoiceData = Pick<Invoice, 'number' | 'receiptValue'> &
  Pick<Schedule, 'shippingName'> &
  Pick<Provider, 'name'>

export interface IReceiptPerInvoiceProvider {
  generate(data: IReceiptPerInvoiceData): Promise<File>
}
