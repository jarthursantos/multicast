import { IPrincipalClient } from '~/domain/IClient'

export interface IPrincipalClientsModel {
  findById(id: number): Promise<IPrincipalClient | undefined>
  findMany(): Promise<IPrincipalClient[]>
}
