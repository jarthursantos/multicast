import { Category } from 'entities/Category'
import { Section } from 'entities/Section'

export interface ICategoryRepository {
  findById(section: Section, id: number): Promise<Category | undefined>
  findMany(section: Section): Promise<Category[]>
}
