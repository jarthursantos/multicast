import { DetailedProvider } from 'entities/Provider'

export interface IProviderRepository {
  findById(id: number): Promise<DetailedProvider | undefined>
  findMany(query?: string): Promise<DetailedProvider[]>
}
