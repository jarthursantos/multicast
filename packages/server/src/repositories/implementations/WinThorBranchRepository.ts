import { winthor } from 'libs/knex-winthor'
import { IBranchRepository } from 'repositories/IBranchRepository'

export class WinThorBranchRepository implements IBranchRepository {
  async findMany(): Promise<string[]> {
    const response = await winthor.raw<{ code: string }[]>(`
      SELECT CODIGO AS "code"
      FROM PCFILIAL
      ORDER BY CODIGO
    `)

    return response.map(({ code }) => code)
  }
}
