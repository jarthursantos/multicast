import { IBasicProduct } from '~/domain/IProduct'

export interface IProductsModel {
  findById(id: number): Promise<IBasicProduct | undefined>
  findMany(): Promise<IBasicProduct[]>
}
