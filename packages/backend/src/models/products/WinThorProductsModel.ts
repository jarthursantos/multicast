import { IBasicProduct } from '~/domain/IProduct'
import { winthor } from '~/libraries/WinThor'

import { IProductsModel } from './IProductsModel'

export function createWinThorProductsModel(): IProductsModel {
  return {
    async findById(id: number): Promise<IBasicProduct> {
      const response = await winthor.raw<IBasicProduct[]>(`
        SELECT CODPROD   AS "code",
               DESCRICAO AS "name"
        FROM PCPRODUT
        WHERE CODPROD IS NOT NULL
          AND DTEXCLUSAO IS NULL
          AND CODPROD = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IBasicProduct[]> {
      const response = await winthor.raw<IBasicProduct[]>(`
        SELECT CODPROD   AS "code",
               DESCRICAO AS "name"
        FROM PCPRODUT
        WHERE CODPROD IS NOT NULL
          AND DTEXCLUSAO IS NULL
        ORDER BY CODPROD
      `)

      return response
    }
  }
}
