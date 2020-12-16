import { IRCA } from '~/domain/IRCA'
import { winthor } from '~/libraries/WinThor'

import { IRCAsModel } from './IRCAsModel'

export function createWinThorRCAsModel(): IRCAsModel {
  return {
    async findById(code: number): Promise<IRCA> {
      const response = await winthor.raw<IRCA[]>(`
        SELECT CODUSUR AS "code",
               NOME    AS "name"
        FROM PCUSUARI
        WHERE CODUSUR = ${code}
      `)

      return response[0]
    },

    async findMany(): Promise<IRCA[]> {
      const response = await winthor.raw<IRCA[]>(`
        SELECT CODUSUR AS "code",
               NOME    AS "name"
        FROM PCUSUARI
        ORDER BY CODUSUR
      `)

      return response
    }
  }
}
