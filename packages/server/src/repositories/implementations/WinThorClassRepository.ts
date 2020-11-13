import { winthor } from 'libs/knex-winthor'
import { IClassRepository } from 'repositories/IClassRepository'

export class WinThorClassRepository implements IClassRepository {
  async findMany(): Promise<string[]> {
    const response = await winthor.raw<{ code: string }[]>(`
      SELECT DISTINCT CLASSE AS "code"
      FROM PCPRODUT
      WHERE CLASSE IS NOT NULL
      ORDER BY CLASSE
    `)

    return response.map(({ code }) => code)
  }
}
