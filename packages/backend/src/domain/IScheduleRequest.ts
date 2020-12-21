import { v4 as uuid } from 'uuid'

import { IProvider } from './IProvider'

export interface IScheduleRequest {
  readonly id: string

  requestedDate: Date
  providerCode: number

  provider?: IProvider
}

export function createScheduleRequest(
  props: Omit<IScheduleRequest, 'id'>,
  id?: string
): IScheduleRequest {
  return {
    requestedDate: props.requestedDate,
    providerCode: props.providerCode,
    provider: props.provider,
    id: id || uuid()
  }
}
