import { RCA } from 'entities/RCA'
import { winthor } from 'libs/knex-winthor'
import { IRCARepository } from 'repositories/IRCARepository'

export class WinThorRCARepository implements IRCARepository {
  async findById(code: number): Promise<RCA> {
    const response = await winthor.raw<RCA[]>(`
      SELECT CODUSUR AS "code",
             NOME    AS "name"
      FROM PCUSUARI
      WHERE CODUSUR = ${code}
    `)

    return response[0]
  }

  async findMany(): Promise<RCA[]> {
    const response = await winthor.raw<RCA[]>(`
      SELECT CODUSUR AS "code",
             NOME    AS "name"
      FROM PCUSUARI
      ORDER BY CODUSUR
    `)

    return response
  }
}
