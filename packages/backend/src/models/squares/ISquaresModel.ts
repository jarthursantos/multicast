import { ISquare } from '~/domain/ISquare'

export interface ISquareModels {
  findById(id: number): Promise<ISquare | undefined>
  findMany(): Promise<ISquare[]>
}
