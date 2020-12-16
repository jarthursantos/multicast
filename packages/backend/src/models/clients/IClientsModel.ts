import { IClient } from '~/domain/IClient'

export interface IClientsModel {
  findById(id: number): Promise<IClient | undefined>
  findMany(): Promise<IClient[]>
}
