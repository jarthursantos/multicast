import { IClientWeb } from '~/domain/IClient'
import { winthor } from '~/libraries/WinThor'

import { IClientWebsModel } from './IClientWebsModel'

export function createWinThorClientWebsModel(): IClientWebsModel {
  return {
    async findById(id: number): Promise<IClientWeb> {
      const response = await winthor.raw<IClientWeb[]>(`
        SELECT CODREDE   AS "code",
               DESCRICAO AS "name"
        FROM PCREDECLIENTE
        WHERE CODREDE = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IClientWeb[]> {
      const response = await winthor.raw<IClientWeb[]>(`
        SELECT CODREDE   AS "code",
               DESCRICAO AS "name"
        FROM PCREDECLIENTE
        ORDER BY CODREDE
      `)

      return response
    }
  }
}
