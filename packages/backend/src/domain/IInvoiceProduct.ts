import { IProduct } from './IProduct'

export interface IInvoiceProduct extends IProduct {
  price: number
  quantity: number
}
