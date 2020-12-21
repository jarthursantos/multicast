import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface IEditInvoiceScreenProps {
  schedule: ISchedule
  invoice: IInvoice
}
