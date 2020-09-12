import { Invoice } from 'entities/Invoice'
import { Schedule } from 'entities/Schedule'
import { ScheduleSituations } from 'entities/ScheduleSituations'

export type ScheduleSituationConditions = Pick<
  Schedule,
  'canceledAt' | 'closedAt' | 'rescheduledAt' | 'scheduledAt' | 'receivedAt'
>

export interface IScheduleSituationsProvider {
  find(
    schedule: ScheduleSituationConditions,
    invoices?: Invoice[]
  ): ScheduleSituations
}
