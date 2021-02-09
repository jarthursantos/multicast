import { IBuyer } from '@shared/web-components'

import { IRepresentedProvider } from './RepresentedInput/Represented/types'

export interface IFormData {
  date: Date
  buyer: IBuyer[]
  representeds: IRepresentedProvider[]
  hour: number
  representative: number
}

export interface IAvailableHour {
  start: string | Date
  end: string | Date
}
