import { winthor } from '~/libraries/WinThor'

import { IBranchesModel } from './IBranchesModel'

export function createWinThorBranchesModel(): IBranchesModel {
  return {
    findMany: async () => {
      const response = await winthor.raw<{ code: string }[]>(`
        SELECT CODIGO AS "code"
        FROM PCFILIAL
        ORDER BY CODIGO
      `)

      return response.map(({ code }) => code)
    }
  }
}
