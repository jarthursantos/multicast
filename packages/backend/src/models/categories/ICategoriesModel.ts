import { ICategory } from '~/domain/ICategory'
import { ISection } from '~/domain/ISection'

export interface ICategoriesModel {
  findById(section: ISection, id: number): Promise<ICategory | undefined>
  findMany(section: ISection): Promise<ICategory[]>
}
