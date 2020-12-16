import { IProductLine } from '~/domain/IProductLine'

export interface IProductLinesModel {
  findById(id: number): Promise<IProductLine | undefined>
  findMany(): Promise<IProductLine[]>
}
