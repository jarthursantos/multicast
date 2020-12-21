import { IDetailedProvider } from './IProvider'

export interface IRepresentative {
  name: string
  email: string
  phone: string
}

export interface IDetailedRepresentative extends IRepresentative {
  provider: Omit<IDetailedProvider, 'representative'>
}
