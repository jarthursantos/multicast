import { IBuyer } from '~/domain/IBuyer'
import { winthor } from '~/libraries/WinThor'

import { IBuyersModel } from './IBuyersModel'

export function createWinThorBuyersModel(): IBuyersModel {
  function formatQuery(query?: string) {
    if (!query) return ''

    return `AND (TO_CHAR(MATRICULA) LIKE '${query.toUpperCase()}' OR NOME LIKE '%${query.toUpperCase()}%')`
  }

  return {
    async findById(id: number): Promise<IBuyer> {
      const response = await winthor.raw<IBuyer[]>(`
        SELECT MATRICULA AS "code",
               NOME      AS "name"
        FROM PCEMPR
        WHERE CODSETOR IN (SELECT CODSETORCOMPRADOR FROM PCCONSUM)
          AND MATRICULA = ${id}
        ORDER BY NOME
      `)

      return response[0]
    },

    async findMany(query?: string): Promise<IBuyer[]> {
      const response = await winthor.raw<IBuyer[]>(`
        SELECT MATRICULA AS "code",
               NOME      AS "name"
        FROM PCEMPR
        WHERE CODSETOR IN (SELECT CODSETORCOMPRADOR FROM PCCONSUM)
          ${formatQuery(query)}
        ORDER BY NOME
      `)

      return response
    }
  }
}
