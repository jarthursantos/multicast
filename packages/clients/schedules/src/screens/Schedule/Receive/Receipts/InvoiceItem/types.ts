import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface IReceiptInvoiceItemProps {
  schedule: ISchedule
  invoice: IInvoice
  index: number
  receiptPerInvoice: boolean
  canChangeSituation: boolean
}
