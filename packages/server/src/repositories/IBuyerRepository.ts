import { Buyer } from 'entities/Buyer'

export interface IBuyerRepository {
  findById(id: number): Promise<Buyer | undefined>
  findMany(query?: string): Promise<Buyer[]>
}
