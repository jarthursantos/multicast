import { Category, Subcategory } from 'entities/Category'
import { Section } from 'entities/Section'
import { winthor } from 'libs/knex-winthor'
import { ISubcategoryRepository } from 'repositories/ISubcategoryRepository'

export class WinThorSubcategoryRepository implements ISubcategoryRepository {
  async findById(
    section: Section,
    category: Category,
    id: number
  ): Promise<Subcategory> {
    const response = await winthor.raw<Subcategory[]>(`
      SELECT CODSUBCATEGORIA AS "code",
             SUBCATEGORIA    AS "name"
      FROM PCSUBCATEGORIA
      WHERE CODSEC = ${section.code}
        AND CODCATEGORIA = ${category.code}
        AND CODSUBCATEGORIA = ${id}
    `)

    return response[0]
  }

  async findMany(section: Section, category: Category): Promise<Subcategory[]> {
    const response = await winthor.raw<Subcategory[]>(`
      SELECT CODSUBCATEGORIA AS "code",
             SUBCATEGORIA    AS "name"
      FROM PCSUBCATEGORIA
      WHERE CODSUBCATEGORIA IS NOT NULL
        AND CODSEC = ${section.code}
        AND CODCATEGORIA = ${category.code}
      ORDER BY CODSUBCATEGORIA
    `)

    return response
  }
}
