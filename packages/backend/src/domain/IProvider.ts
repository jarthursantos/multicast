import { IBuyer } from './IBuyer'
import { IRepresentative } from './IRepresentative'

export interface IPrincipalProvider {
  code: number
  name: string
  fantasy: string
  cnpj: string
}

export interface IProvider extends IPrincipalProvider {
  principalCode: number
}

export interface IDetailedProvider extends IProvider {
  representative: IRepresentative
  buyer: IBuyer

  city: string
  state: string
  deliveryTime: number
}
