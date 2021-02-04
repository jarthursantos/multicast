import { IBuyer } from '../BuyerInput'

export interface IProvider {
  code: number
  name: string
  buyer?: IBuyer
  principalCode: number
}

export interface IProviderInputProps {
  name: string
  label: string
  disabled?: boolean
  single?: boolean
  onProvidersChange?(providers: IProvider[]): void
}
