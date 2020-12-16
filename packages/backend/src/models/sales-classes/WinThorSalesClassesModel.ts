import { winthor } from '~/libraries/WinThor'

import { ISalesClassModel } from './ISalesClassesModel'

export function createWinThorSalesClassesModel(): ISalesClassModel {
  return {
    async findMany(): Promise<string[]> {
      const response = await winthor.raw<{ code: string }[]>(`
      SELECT DISTINCT CLASSEVENDA AS "code"
      FROM PCPRODUT
      ORDER BY CLASSEVENDA
    `)

      return response.map(({ code }) => code)
    }
  }
}
