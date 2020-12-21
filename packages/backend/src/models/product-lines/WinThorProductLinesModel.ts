import { IProductLine } from '~/domain/IProductLine'
import { winthor } from '~/libraries/WinThor'

import { IProductLinesModel } from './IProductLinesModel'

export function createWinThorProductLinesModel(): IProductLinesModel {
  return {
    async findById(id: number): Promise<IProductLine> {
      const response = await winthor.raw<IProductLine[]>(`
        SELECT CODLINHA  AS "code",
               DESCRICAO AS "name"
        FROM PCLINHAPROD
        WHERE CODLINHA = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IProductLine[]> {
      const response = await winthor.raw<IProductLine[]>(`
        SELECT CODLINHA  AS "code",
               DESCRICAO AS "name"
        FROM PCLINHAPROD
        WHERE CODLINHA IS NOT NULL
        ORDER BY CODLINHA
      `)

      return response
    }
  }
}
