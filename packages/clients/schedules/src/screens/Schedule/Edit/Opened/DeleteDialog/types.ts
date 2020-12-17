import { ISchedule } from '~/store/modules/schedules/types'

export interface IDeleteDialogProps {
  schedule?: ISchedule
}

export interface IDeleteDialogHandles {
  open(): void
}
