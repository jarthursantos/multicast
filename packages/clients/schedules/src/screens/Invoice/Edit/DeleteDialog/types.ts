import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

export interface IDeleteDialogProps {
  schedule?: ISchedule
  invoice?: IInvoice
}

export interface IDeleteDialogHandles {
  open(): void
}
