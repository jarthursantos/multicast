import { Category, Subcategory } from 'entities/Category'
import { Section } from 'entities/Section'

export interface ISubcategoryRepository {
  findById(
    section: Section,
    category: Category,
    id: number
  ): Promise<Subcategory | undefined>
  findMany(section: Section, category: Category): Promise<Subcategory[]>
}
