import { Section } from 'entities/Section'
import { winthor } from 'libs/knex-winthor'
import { ISectionRepository } from 'repositories/ISectionRepository'

export class WinThorSectionRepository implements ISectionRepository {
  async findById(id: number): Promise<Section> {
    const response = await winthor.raw<Section[]>(`
      SELECT CODSEC    AS "code",
             DESCRICAO AS "name"
      FROM PCSECAO
      WHERE CODSEC = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Section[]> {
    const response = await winthor.raw<Section[]>(`
      SELECT CODSEC    AS "code",
             DESCRICAO AS "name"
      FROM PCSECAO
      WHERE CODSEC IS NOT NULL
      ORDER BY DESCRICAO
    `)

    return response
  }
}
