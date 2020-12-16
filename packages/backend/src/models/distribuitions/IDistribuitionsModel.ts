import { IDistribuition } from '~/domain/IDistribuition'

export interface IDistribuitionsModel {
  findById(id: string): Promise<IDistribuition | undefined>
  findMany(): Promise<IDistribuition[]>
}
