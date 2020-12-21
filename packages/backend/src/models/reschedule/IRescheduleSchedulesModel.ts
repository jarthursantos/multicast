import { IRescheduleResult } from '~/domain/IRescheduleResult'
import { ISchedule } from '~/domain/ISchedule'

export interface IRescheduleSchedulesModel {
  reschedule(schedule: ISchedule, newDate: Date): Promise<IRescheduleResult>
}
