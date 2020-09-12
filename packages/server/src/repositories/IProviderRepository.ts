import { Provider } from 'entities/Provider'

export interface IProviderRepository {
  findById(id: number): Promise<Provider | undefined>
  findMany(): Promise<Provider[]>
}
