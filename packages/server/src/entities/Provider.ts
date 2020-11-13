import { Buyer } from './Buyer'
import { Representative } from './Representative'

export interface PrincipalProvider {
  code: number
  name: string
  fantasy: string
  cnpj: string
}

export interface Provider extends PrincipalProvider {
  principalCode: number
}

export interface DetailedProvider extends Provider {
  representative: Representative
  buyer: Buyer

  city: string
  state: string
  deliveryTime: number
}
