import { Category } from 'entities/Category'
import { Section } from 'entities/Section'
import { winthor } from 'libs/knex-winthor'
import { ICategoryRepository } from 'repositories/ICategoryRepository'

export class WinThorCategoryRepository implements ICategoryRepository {
  async findById(section: Section, id: number): Promise<Category> {
    const response = await winthor.raw<Category[]>(`
      SELECT CODCATEGORIA AS "code",
             CATEGORIA    AS "name"
      FROM PCCATEGORIA
      WHERE CODSEC = ${section.code}
        AND CODCATEGORIA = ${id}
    `)

    return response[0]
  }

  async findMany(section: Section): Promise<Category[]> {
    const response = await winthor.raw<Category[]>(`
      SELECT CODCATEGORIA AS "code",
             CATEGORIA    AS "name"
      FROM PCCATEGORIA
      WHERE CODCATEGORIA IS NOT NULL
        AND CODSEC = ${section.code}
      ORDER BY CODCATEGORIA
    `)

    return response
  }
}
