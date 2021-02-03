import { IBuyer, IProvider, ITime } from '~/../../../shared/web-components'

export interface FormData {
  date: Date
  buyer: IBuyer[]
  providers: IProvider[]
  startTime: ITime
  endTime: ITime
}
