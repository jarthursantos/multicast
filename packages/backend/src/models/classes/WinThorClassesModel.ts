import { winthor } from '~/libraries/WinThor'

import { IClassesModel } from './IClassesModel'

export function createWinThorClassesModel(): IClassesModel {
  return {
    findMany: async (): Promise<string[]> => {
      const response = await winthor.raw<{ code: string }[]>(`
        SELECT DISTINCT CLASSE AS "code"
        FROM PCPRODUT
        WHERE CLASSE IS NOT NULL
        ORDER BY CLASSE
      `)

      return response.map(({ code }) => code)
    }
  }
}
