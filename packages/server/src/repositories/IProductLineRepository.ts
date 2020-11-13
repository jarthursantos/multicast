import { ProductLine } from 'entities/ProductLine'

export interface IProductLineRepository {
  findById(id: number): Promise<ProductLine | undefined>
  findMany(): Promise<ProductLine[]>
}
