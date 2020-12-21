import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface IReadonlyInvoiceScreenProps {
  schedule: ISchedule
  invoice: IInvoice
}
