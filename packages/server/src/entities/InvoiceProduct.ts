import { pick } from 'lodash'

import { Product } from './Product'

export class InvoiceProduct extends Product {
  public price: number
  public quantity: number

  constructor(data: InvoiceProduct) {
    super(data)

    Object.assign(this, pick(data, 'price', 'quantity'))
  }
}
