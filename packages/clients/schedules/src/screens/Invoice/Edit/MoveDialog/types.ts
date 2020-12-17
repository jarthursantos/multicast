import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface IMoveDialogProps {
  schedule?: ISchedule
  invoice?: IInvoice
}

export interface IMoveDialogHandles {
  open(): void
}

export interface ISearchParams {
  scheduledAt: Date
  shippingName: string
}
