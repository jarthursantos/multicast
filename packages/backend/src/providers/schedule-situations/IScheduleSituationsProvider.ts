import { IInvoice } from '~/domain/IInvoice'
import { ISchedule } from '~/domain/ISchedule'
import { ScheduleSituations } from '~/domain/ScheduleSituations'

export type IScheduleSituationConditions = Pick<
  ISchedule,
  'canceledAt' | 'closedAt' | 'rescheduledAt' | 'scheduledAt' | 'receivedAt'
>

export interface IScheduleSituationsProvider {
  find(
    schedule: IScheduleSituationConditions,
    invoices?: IInvoice[]
  ): ScheduleSituations
}
