import { IRCA } from '~/domain/IRCA'

export interface IRCAsModel {
  findById(code: number): Promise<IRCA | undefined>
  findMany(): Promise<IRCA[]>
}
