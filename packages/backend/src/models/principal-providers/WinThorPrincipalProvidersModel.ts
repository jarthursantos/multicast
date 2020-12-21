import { IPrincipalProvider } from '~/domain/IProvider'
import { winthor } from '~/libraries/WinThor'

import { IPrincipalProvidersModel } from './IPrincipalProvidersModel'

export function createWinThorPrincipalProvidersModel(): IPrincipalProvidersModel {
  return {
    async findById(id: number): Promise<IPrincipalProvider> {
      const response = await winthor.raw<IPrincipalProvider[]>(`
        SELECT CODFORNEC  AS "code",
               FORNECEDOR AS "name",
               FANTASIA   AS "fantasy",
               CGC        AS "cnpj"
        FROM PCFORNEC
        WHERE CODFORNEC = CODFORNECPRINC
          AND CODFORNEC = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<IPrincipalProvider[]> {
      const response = await winthor.raw<IPrincipalProvider[]>(`
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
}
