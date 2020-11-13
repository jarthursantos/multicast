import { PrincipalProvider } from 'entities/Provider'

export interface IPrincipalProviderRepository {
  findById(id: number): Promise<PrincipalProvider | undefined>
  findMany(): Promise<PrincipalProvider[]>
}
