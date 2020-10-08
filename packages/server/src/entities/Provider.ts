import { Buyer } from './Buyer'
import { Representative } from './Representative'

export interface Provider {
  code: number
  name: string
  fantasy: string
  principalCode: number
  cnpj: string
}

export interface DetailedProvider extends Provider {
  representative: Representative
  buyer: Buyer

  city: string
  state: string
  deliveryTime: number
}
