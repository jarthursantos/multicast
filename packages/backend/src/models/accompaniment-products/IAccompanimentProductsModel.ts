import { IAccompaniment } from '~/domain/IAccompaniment'
import { IProduct } from '~/domain/IProduct'

export interface IOptions {
  only: 'pending' | 'delivered'
}

export interface IAccompanimentProductsModel {
  findFromInvoice(accompaniment: IAccompaniment): Promise<IProduct[]>
  find(accompaniment: IAccompaniment, options?: IOptions): Promise<IProduct[]>
}
