import { pick } from 'lodash'

import { Change } from './Change'
import { ScheduleRequest } from './ScheduleRequest'

export class ScheduleRequestHistory {
  public scheduleRequest: ScheduleRequest
  public providerCode?: Change<number>
  public requestedDate?: Change<Date>

  constructor(
    user: ScheduleRequest,
    data: Omit<ScheduleRequestHistory, 'user'>
  ) {
    Object.assign(this, pick(data, 'providerCode', 'requestedDate'))

    this.scheduleRequest = user
  }
}
