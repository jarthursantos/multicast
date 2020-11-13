import { PrincipalClient } from 'entities/Clients'
import { winthor } from 'libs/knex-winthor'
import { IPrincipalClientRepository } from 'repositories/IPrincipalClientRepository'

export class WinThorPrincipalClientRepository
  implements IPrincipalClientRepository {
  async findById(id: number): Promise<PrincipalClient> {
    const response = await winthor.raw<PrincipalClient[]>(`
      SELECT CODCLI   AS "code",
             CLIENTE  AS "name",
             FANTASIA AS "fantasy",
             CGCENT   AS "cnpj"
      FROM PCCLIENT
      WHERE CODCLI = CODCLIPRINC
        AND CODCLI = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<PrincipalClient[]> {
    const response = await winthor.raw<PrincipalClient[]>(`
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
