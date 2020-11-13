import { Square } from 'entities/Square'

export interface ISquareRepository {
  findById(id: number): Promise<Square | undefined>
  findMany(): Promise<Square[]>
}
