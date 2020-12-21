import { IPrincipalClient } from '~/domain/IClient'
import { winthor } from '~/libraries/WinThor'

import { IPrincipalClientsModel } from './IPrincipalClientsModel'

export function createWinThorPrincipalClientsModel(): IPrincipalClientsModel {
  return {
    async findById(id: number): Promise<IPrincipalClient> {
      const response = await winthor.raw<IPrincipalClient[]>(`
        SELECT CODCLI   AS "code",
               CLIENTE  AS "name",
               FANTASIA AS "fantasy",
               CGCENT   AS "cnpj"
        FROM PCCLIENT
        WHERE CODCLI = CODCLIPRINC
          AND CODCLI = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IPrincipalClient[]> {
      const response = await winthor.raw<IPrincipalClient[]>(`
        SELECT CODCLI   AS "code",
               CLIENTE  AS "name",
               FANTASIA AS "fantasy",
               CGCENT   AS "cnpj"
        FROM PCCLIENT
        WHERE CODCLI = CODCLIPRINC
          AND CODCLI IS NOT NULL
        ORDER BY CODCLI
      `)

      return response
    }
  }
}
