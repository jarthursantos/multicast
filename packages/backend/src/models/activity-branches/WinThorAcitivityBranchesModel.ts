import { IActivityBranch } from '~/domain/IActivityBranch'
import { winthor } from '~/libraries/WinThor'

import { IActivityBranchesModel } from './IActivityBranchesModel'

export function createWinThorAcitivityBranchesModel(): IActivityBranchesModel {
  return {
    async findById(id: number): Promise<IActivityBranch> {
      const response = await winthor.raw<IActivityBranch[]>(`
      SELECT CODATIV AS "code",
             RAMO    AS "name"
      FROM PCATIVI
      WHERE CODATIV = ${id}
    `)

      return response[0]
    },

    async findMany(): Promise<IActivityBranch[]> {
      const response = await winthor.raw<IActivityBranch[]>(`
      SELECT CODATIV AS "code",
             RAMO    AS "name"
      FROM PCATIVI
      ORDER BY CODATIV
    `)

      return response
    }
  }
}
