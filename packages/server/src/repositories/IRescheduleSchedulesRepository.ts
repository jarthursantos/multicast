import { RescheduleResult } from 'entities/RescheduleResult'
import { Schedule } from 'entities/Schedule'

export interface IRescheduleSchedulesRepository {
  reschedule(schedule: Schedule, newDate: Date): Promise<RescheduleResult>
}
