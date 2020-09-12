import { pick } from 'lodash'

import { Provider } from './Provider'

export class Product {
  public code: number
  public description: string
  public factoryCode: string
  public package: string
  public unity: string

  // public deliveredQuantity: number
  // public requestedQuantity: number

  public provider: Provider

  constructor(props: Product) {
    Object.assign(
      this,
      pick(
        props,
        'code',
        'description',
        'factoryCode',
        'package',
        'unity',
        'provider'
      )
    )
  }
}
