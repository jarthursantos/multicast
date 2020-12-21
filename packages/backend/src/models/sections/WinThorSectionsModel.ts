import { ISection } from '~/domain/ISection'
import { winthor } from '~/libraries/WinThor'

import { ISectionsModel } from './ISectionsModel'

export function createWinThorSectionsModel(): ISectionsModel {
  return {
    async findById(id: number): Promise<ISection> {
      const response = await winthor.raw<ISection[]>(`
        SELECT CODSEC    AS "code",
               DESCRICAO AS "name"
        FROM PCSECAO
        WHERE CODSEC = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<ISection[]> {
      const response = await winthor.raw<ISection[]>(`
        SELECT CODSEC    AS "code",
               DESCRICAO AS "name"
        FROM PCSECAO
        WHERE CODSEC IS NOT NULL
        ORDER BY DESCRICAO
      `)

      return response
    }
  }
}
