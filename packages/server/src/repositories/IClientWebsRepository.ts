import { ClientWeb } from 'entities/Clients'

export interface IClientWebsRepository {
  findById(id: number): Promise<ClientWeb | undefined>
  findMany(): Promise<ClientWeb[]>
}
