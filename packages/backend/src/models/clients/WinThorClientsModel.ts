import { IClient } from '~/domain/IClient'
import { winthor } from '~/libraries/WinThor'

import { IClientsModel } from './IClientsModel'

export function createWinThorClientsModel(): IClientsModel {
  return {
    async findById(id: number): Promise<IClient> {
      const response = await winthor.raw<IClient[]>(`
        SELECT CODCLI   AS "code",
               CLIENTE  AS "name",
               FANTASIA AS "fantasy",
               CGCENT   AS "cnpj"
        FROM PCCLIENT
        WHERE CODCLI = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IClient[]> {
      const response = await winthor.raw<IClient[]>(`
        SELECT CODCLI   AS "code",
               CLIENTE  AS "name",
               FANTASIA AS "fantasy",
               CGCENT   AS "cnpj"
        FROM PCCLIENT
        WHERE CODCLI IS NOT NULL
        ORDER BY CLIENTE
      `)

      return response
    }
  }
}
