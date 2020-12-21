import { IDetailedProvider } from '~/domain/IProvider'

export interface IProvidersModel {
  findById(id: number): Promise<IDetailedProvider | undefined>
  findMany(query?: string): Promise<IDetailedProvider[]>
}
