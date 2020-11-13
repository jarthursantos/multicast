import { PrincipalProvider } from 'entities/Provider'
import { winthor } from 'libs/knex-winthor'
import { IPrincipalProviderRepository } from 'repositories/IPrincipalProviderRepository'

export class WinThorPrincipalProviderRepository
  implements IPrincipalProviderRepository {
  async findById(id: number): Promise<PrincipalProvider> {
    const response = await winthor.raw<PrincipalProvider[]>(`
      SELECT CODFORNEC  AS "code",
             FORNECEDOR AS "name",
             FANTASIA   AS "fantasy",
             CGC        AS "cnpj"
      FROM PCFORNEC
      WHERE CODFORNEC = CODFORNECPRINC
        AND CODFORNEC = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<PrincipalProvider[]> {
    const response = await winthor.raw<PrincipalProvider[]>(`
      SELECT CODFORNEC  AS "code",
             FORNECEDOR AS "name",
             FANTASIA   AS "fantasy",
             CGC        AS "cnpj"
      FROM PCFORNEC
      WHERE CODFORNEC = CODFORNECPRINC
      ORDER BY CODFORNEC
    `)

    return response
  }
}
