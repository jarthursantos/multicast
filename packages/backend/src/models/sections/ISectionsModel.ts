import { ISection } from '~/domain/ISection'

export interface ISectionsModel {
  findById(id: number): Promise<ISection | undefined>
  findMany(): Promise<ISection[]>
}
