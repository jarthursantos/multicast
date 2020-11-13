import { Client } from 'entities/Clients'

export interface IClientsRepository {
  findById(id: number): Promise<Client | undefined>
  findMany(): Promise<Client[]>
}
