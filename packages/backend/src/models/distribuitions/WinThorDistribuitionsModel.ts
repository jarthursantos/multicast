import { IDistribuition } from '~/domain/IDistribuition'
import { winthor } from '~/libraries/WinThor'

import { IDistribuitionsModel } from './IDistribuitionsModel'

export function createWinThorDistribuitionsModel(): IDistribuitionsModel {
  return {
    async findById(id: string): Promise<IDistribuition> {
      const response = await winthor.raw<IDistribuition[]>(`
        SELECT CODDISTRIB AS "code",
               DESCRICAO  AS "name"
        FROM PCDISTRIB
        WHERE CODDISTRIB = '${id}'
      `)

      return response[0]
    },

    async findMany(): Promise<IDistribuition[]> {
      const response = await winthor.raw<IDistribuition[]>(`
        SELECT CODDISTRIB AS "code",
               DESCRICAO  AS "name"
        FROM PCDISTRIB
        WHERE CODDISTRIB IS NOT NULL
        ORDER BY DESCRICAO
      `)

      return response
    }
  }
}
