import { IBrand } from '~/domain/IBrand'

export interface IBrandsModel {
  findById(id: number): Promise<IBrand | undefined>
  findMany(): Promise<IBrand[]>
}
