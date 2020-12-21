import { IFile } from '~/domain/IFile'
import { IInvoice } from '~/domain/IInvoice'
import { IProvider } from '~/domain/IProvider'
import { ISchedule } from '~/domain/ISchedule'

type IInvoiceData = Pick<IInvoice, 'number' | 'receiptValue'> &
  Pick<IProvider, 'name'>

export type IScheduleReceiptData = Pick<
  ISchedule,
  'shippingName' | 'receiptValue'
> & {
  invoices: IInvoiceData[]
}

export interface IScheduleReceiptProvider {
  generate(data: IScheduleReceiptData): Promise<IFile>
}
