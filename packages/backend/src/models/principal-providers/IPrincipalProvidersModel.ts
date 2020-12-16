import { IPrincipalProvider } from '~/domain/IProvider'

export interface IPrincipalProvidersModel {
  findById(id: number): Promise<IPrincipalProvider | undefined>
  findMany(): Promise<IPrincipalProvider[]>
}
