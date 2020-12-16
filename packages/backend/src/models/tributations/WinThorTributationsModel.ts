import { ITributation } from '~/domain/ITributation'
import { winthor } from '~/libraries/WinThor'

import { ITributationsModel } from './ITributationsModel'

export function createWinThorTributationsModel(): ITributationsModel {
  return {
    async findById(id: number): Promise<ITributation> {
      const response = await winthor.raw<ITributation[]>(`
        SELECT CODST    AS "code",
               MENSAGEM AS "name"
        FROM PCTRIBUT
        WHERE CODST = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<ITributation[]> {
      const response = await winthor.raw<ITributation[]>(`
        SELECT CODST    AS "code",
               MENSAGEM AS "name"
        FROM PCTRIBUT
        WHERE CODST IS NOT NULL
        ORDER BY MENSAGEM
      `)

      return response
    }
  }
}
