import { DetailedProvider } from './Provider'

export interface Representative {
  name: string
  email: string
  phone: string
}

export interface DetailedRepresentative extends Representative {
  provider: Omit<DetailedProvider, 'representative'>
}
