import { Provider } from './Provider'

export interface Product {
  code: number
  description: string
  factoryCode: string
  package: string
  unity: string

  deliveredQuantity: number
  requestedQuantity: number

  provider: Provider

  requestsCount?: number
}
