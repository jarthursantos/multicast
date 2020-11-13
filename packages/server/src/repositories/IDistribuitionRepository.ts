import { Distribuition } from 'entities/Distribuition'

export interface IDistribuitionRepository {
  findById(id: string): Promise<Distribuition | undefined>
  findMany(): Promise<Distribuition[]>
}
