import { winthor } from 'libs/knex-winthor'
import { ISalesClassRepository } from 'repositories/ISalesClassRepository'

export class WinThorSalesClassRepository implements ISalesClassRepository {
  async findMany(): Promise<string[]> {
    const response = await winthor.raw<{ code: string }[]>(`
      SELECT DISTINCT CLASSEVENDA AS "code"
      FROM PCPRODUT
      ORDER BY CLASSEVENDA
    `)

    return response.map(({ code }) => code)
  }
}
