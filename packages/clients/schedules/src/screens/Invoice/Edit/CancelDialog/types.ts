import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface ICancelDialogProps {
  schedule?: ISchedule
  invoice?: IInvoice
}

export interface ICancelDialogHandles {
  open(): void
}
