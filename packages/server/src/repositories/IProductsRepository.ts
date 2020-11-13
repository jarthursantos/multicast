import { BasicProduct } from 'entities/Product'

export interface IProductRepository {
  findById(id: number): Promise<BasicProduct | undefined>
  findMany(): Promise<BasicProduct[]>
}
