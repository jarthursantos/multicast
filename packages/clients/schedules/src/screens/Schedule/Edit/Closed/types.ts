import { ISchedule } from '~/store/modules/schedules/types'
import {
  IMarkScheduleInvoiceAsNonReceivedSuccessAction,
  IMarkScheduleInvoiceAsReceivedSuccessAction
} from '~/store/modules/schedules/types'

export interface IEditClosedScheduleScreenProps {
  schedule: ISchedule
}

export type IChangeDivergenceActions =
  | IMarkScheduleInvoiceAsReceivedSuccessAction
  | IMarkScheduleInvoiceAsNonReceivedSuccessAction
