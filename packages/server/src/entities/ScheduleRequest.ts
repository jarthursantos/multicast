import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Provider } from './Provider'

export class ScheduleRequest {
  public readonly id: string

  public requestedDate: Date
  public providerCode: number

  public provider?: Provider

  constructor(props: Omit<ScheduleRequest, 'id'>, id?: string) {
    Object.assign(
      this,
      pick(props, 'requestedDate', 'providerCode', 'provider')
    )

    this.id = id || uuid()
  }
}
