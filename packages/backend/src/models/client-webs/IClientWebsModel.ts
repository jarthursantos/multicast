import { IClientWeb } from '~/domain/IClient'

export interface IClientWebsModel {
  findById(id: number): Promise<IClientWeb | undefined>
  findMany(): Promise<IClientWeb[]>
}
