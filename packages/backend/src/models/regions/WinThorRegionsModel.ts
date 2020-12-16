import { IRegion } from '~/domain/IRegion'
import { winthor } from '~/libraries/WinThor'

import { IRegionsModel } from './IRegionsModel'

export function createWinThorRegionsModel(): IRegionsModel {
  return {
    async findById(id: number): Promise<IRegion> {
      const response = await winthor.raw<IRegion[]>(`
        SELECT NUMREGIAO                                               AS "code",
               REGIAO                                                  AS "name",
               DECODE(NVL(STATUS, ''), 'A', 'active', 'I', 'inactive') AS "situation"
        FROM PCREGIAO
        WHERE NUMREGIAO IS NOT NULL
          AND NVL(STATUS, 'A') <> 'I'
          AND NUMREGIAO = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IRegion[]> {
      const response = await winthor.raw<IRegion[]>(`
        SELECT NUMREGIAO                                               AS "code",
               REGIAO                                                  AS "name",
               DECODE(NVL(STATUS, ''), 'A', 'active', 'I', 'inactive') AS "situation"
        FROM PCREGIAO
        WHERE NUMREGIAO IS NOT NULL
          AND NVL(STATUS, 'A') <> 'I'
        ORDER BY NUMREGIAO
      `)

      return response
    }
  }
}
