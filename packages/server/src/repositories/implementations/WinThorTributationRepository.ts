import { Tributation } from 'entities/Tributation'
import { winthor } from 'libs/knex-winthor'
import { ITributationRepository } from 'repositories/ITributationRepository'

export class WinThorTributationRepository implements ITributationRepository {
  async findById(id: number): Promise<Tributation> {
    const response = await winthor.raw<Tributation[]>(`
      SELECT CODST    AS "code",
             MENSAGEM AS "name"
      FROM PCTRIBUT
      WHERE CODST = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Tributation[]> {
    const response = await winthor.raw<Tributation[]>(`
      SELECT CODST    AS "code",
             MENSAGEM AS "name"
      FROM PCTRIBUT
      WHERE CODST IS NOT NULL
      ORDER BY MENSAGEM
    `)

    return response
  }
}
