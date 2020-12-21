import { ICategory } from '~/domain/ICategory'
import { ISection } from '~/domain/ISection'
import { winthor } from '~/libraries/WinThor'

import { ICategoriesModel } from './ICategoriesModel'

export function createWinThorCategoriesModel(): ICategoriesModel {
  return {
    async findById(section: ISection, id: number): Promise<ICategory> {
      const response = await winthor.raw<ICategory[]>(`
        SELECT CODCATEGORIA AS "code",
               CATEGORIA    AS "name"
        FROM PCCATEGORIA
        WHERE CODSEC = ${section.code}
          AND CODCATEGORIA = ${id}
      `)

      return response[0]
    },

    async findMany(section: ISection): Promise<ICategory[]> {
      const response = await winthor.raw<ICategory[]>(`
        SELECT CODCATEGORIA AS "code",
               CATEGORIA    AS "name"
        FROM PCCATEGORIA
        WHERE CODCATEGORIA IS NOT NULL
          AND CODSEC = ${section.code}
        ORDER BY CODCATEGORIA
      `)

      return response
    }
  }
}
