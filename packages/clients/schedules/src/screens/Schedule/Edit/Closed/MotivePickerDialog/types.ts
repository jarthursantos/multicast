import { ISchedule } from '~/store/modules/schedules/types'

export interface IMotivePickerDialogProps {
  schedule?: ISchedule
}

export interface IMotivePickerDialogHandles {
  open(): void
}
