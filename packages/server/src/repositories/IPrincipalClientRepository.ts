import { PrincipalClient } from 'entities/Clients'

export interface IPrincipalClientRepository {
  findById(id: number): Promise<PrincipalClient | undefined>
  findMany(): Promise<PrincipalClient[]>
}
