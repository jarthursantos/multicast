import { ICategory } from '~/domain/ICategory'
import { ISection } from '~/domain/ISection'
import { ISubcategory } from '~/domain/ISubcategory'

export interface ISubcategoriesModel {
  findById(
    section: ISection,
    category: ICategory,
    id: number
  ): Promise<ISubcategory | undefined>
  findMany(section: ISection, category: ICategory): Promise<ISubcategory[]>
}
