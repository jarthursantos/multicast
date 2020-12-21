import { IBrand } from '~/domain/IBrand'
import { winthor } from '~/libraries/WinThor'

import { IBrandsModel } from './IBrandsModel'

export function createWinThorBrandsModel(): IBrandsModel {
  return {
    async findById(id: number): Promise<IBrand> {
      const response = await winthor.raw<IBrand[]>(`
        SELECT CODMARCA AS "code",
               MARCA    AS "name"
        FROM PCMARCA
        WHERE CODMARCA = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IBrand[]> {
      const response = await winthor.raw<IBrand[]>(`
        SELECT CODMARCA AS "code",
               MARCA    AS "name"
        FROM PCMARCA
        WHERE CODMARCA IS NOT NULL
        ORDER BY MARCA
      `)

      return response
    }
  }
}
