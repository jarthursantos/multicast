import { ICategory } from '~/domain/ICategory'
import { ISection } from '~/domain/ISection'
import { ISubcategory } from '~/domain/ISubcategory'
import { winthor } from '~/libraries/WinThor'

import { ISubcategoriesModel } from './ISubcategoriesModel'

export function createWinThorSubcategoriesModel(): ISubcategoriesModel {
  return {
    async findById(
      section: ISection,
      category: ICategory,
      id: number
    ): Promise<ISubcategory> {
      const response = await winthor.raw<ISubcategory[]>(`
        SELECT CODSUBCATEGORIA AS "code",
               SUBCATEGORIA    AS "name"
        FROM PCSUBCATEGORIA
        WHERE CODSEC = ${section.code}
          AND CODCATEGORIA = ${category.code}
          AND CODSUBCATEGORIA = ${id}
      `)

      return response[0]
    },

    async findMany(
      section: ISection,
      category: ICategory
    ): Promise<ISubcategory[]> {
      const response = await winthor.raw<ISubcategory[]>(`
        SELECT CODSUBCATEGORIA AS "code",
               SUBCATEGORIA    AS "name"
        FROM PCSUBCATEGORIA
        WHERE CODSUBCATEGORIA IS NOT NULL
          AND CODSEC = ${section.code}
          AND CODCATEGORIA = ${category.code}
        ORDER BY CODSUBCATEGORIA
      `)

      return response
    }
  }
}
