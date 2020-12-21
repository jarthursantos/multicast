import { IFile } from '~/domain/IFile'
import { IInvoice } from '~/domain/IInvoice'
import { IProvider } from '~/domain/IProvider'
import { ISchedule } from '~/domain/ISchedule'

export type IScheduleInvoiceReceiptData = Pick<
  IInvoice,
  'number' | 'receiptValue'
> &
  Pick<ISchedule, 'shippingName'> &
  Pick<IProvider, 'name'>

export interface IScheduleInvoiceReceiptProvider {
  generate(data: IScheduleInvoiceReceiptData): Promise<IFile>
}
