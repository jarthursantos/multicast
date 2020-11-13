import { Brand } from 'entities/Brand'
import { winthor } from 'libs/knex-winthor'
import { IBrandRepository } from 'repositories/IBrandsRepository'

export class WinThorBrandRepository implements IBrandRepository {
  async findById(id: number): Promise<Brand> {
    const response = await winthor.raw<Brand[]>(`
      SELECT CODMARCA AS "code",
             MARCA    AS "name"
      FROM PCMARCA
      WHERE CODMARCA = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Brand[]> {
    const response = await winthor.raw<Brand[]>(`
      SELECT CODMARCA AS "code",
             MARCA    AS "name"
      FROM PCMARCA
      WHERE CODMARCA IS NOT NULL
      ORDER BY MARCA
    `)

    return response
  }
}
