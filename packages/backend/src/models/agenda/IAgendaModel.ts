import { IAgenda } from '~/domain/IAgenda'
import { IBuyer } from '~/domain/IBuyer'
import { IProvider } from '~/domain/IProvider'

export interface IAgendaModel {
  save(agenda: Omit<IAgenda, 'id'>): Promise<IAgenda>
  findMany(): Promise<IAgenda[]>
  findByBuyer(buyer: IBuyer): Promise<IAgenda[]>
  findByProvider(provider: IProvider): Promise<IAgenda[]>
  update(agenda: IAgenda): Promise<void>
  delete(agenda: IAgenda): Promise<void>
}
