import { Accompaniment } from 'entities/Accompaniment'
import { Product } from 'entities/Product'

export interface Options {
  only: 'pending' | 'delivered'
}

export interface IAccompanimentProductsRepository {
  findFromInvoice(accompaniment: Accompaniment): Promise<Product[]>
  find(accompaniment: Accompaniment, options?: Options): Promise<Product[]>
}
