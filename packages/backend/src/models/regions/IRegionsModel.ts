import { IRegion } from '~/domain/IRegion'

export interface IRegionsModel {
  findById(id: number): Promise<IRegion | undefined>
  findMany(): Promise<IRegion[]>
}
