import { IChange } from './IChange'
import { IScheduleRequest } from './IScheduleRequest'

export interface IScheduleRequestChanges {
  scheduleRequest: IScheduleRequest
  providerCode?: IChange<number>
  requestedDate?: IChange<Date>
}

export function createScheduleRequestChanges(
  scheduleRequest: IScheduleRequest,
  props: Omit<IScheduleRequestChanges, 'user'>
): IScheduleRequestChanges {
  return {
    scheduleRequest,
    providerCode: props.providerCode,
    requestedDate: props.requestedDate
  }
}
