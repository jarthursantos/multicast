import { Tributation } from 'entities/Tributation'

export interface ITributationRepository {
  findById(id: number): Promise<Tributation | undefined>
  findMany(): Promise<Tributation[]>
}
