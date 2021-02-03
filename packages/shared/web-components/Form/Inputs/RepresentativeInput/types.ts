import { IBuyer } from '../BuyerInput'
import { IProvider } from '../ProviderInput'

export interface IRepresentativeInputProps {
  name: string
  label: string
  buyer?: IBuyer
  disabled?: boolean
}

export interface IRepresentative {
  name: string
  phone: string
  email: string
  provider: IProvider
}
