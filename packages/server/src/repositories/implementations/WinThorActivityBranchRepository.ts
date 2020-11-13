import { ActivityBranch } from 'entities/ActivityBranch'
import { winthor } from 'libs/knex-winthor'
import { IActivityBranchRepository } from 'repositories/IActivityBranchRepository'

export class WinThorActivityBranchRepository
  implements IActivityBranchRepository {
  async findById(id: number): Promise<ActivityBranch> {
    const response = await winthor.raw<ActivityBranch[]>(`
      SELECT CODATIV AS "code",
             RAMO    AS "name"
      FROM PCATIVI
      WHERE CODATIV = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<ActivityBranch[]> {
    const response = await winthor.raw<ActivityBranch[]>(`
      SELECT CODATIV AS "code",
             RAMO    AS "name"
      FROM PCATIVI
      ORDER BY CODATIV
    `)

    return response
  }
}
