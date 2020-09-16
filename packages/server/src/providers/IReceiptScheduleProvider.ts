import { File } from 'entities/File'
import { Invoice } from 'entities/Invoice'
import { Provider } from 'entities/Provider'
import { Schedule } from 'entities/Schedule'

type IInvoiceData = Pick<Invoice, 'number' | 'receiptValue'> &
  Pick<Provider, 'name'>

export type IReceiptScheduleData = Pick<
  Schedule,
  'shippingName' | 'receiptValue'
> & {
  invoices: IInvoiceData[]
}

export interface IReceiptScheduleProvider {
  generate(data: IReceiptScheduleData): Promise<File>
}
