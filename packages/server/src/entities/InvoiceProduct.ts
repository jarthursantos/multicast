import { Product } from './Product'

export interface InvoiceProduct extends Product {
  price: number
  quantity: number
}
