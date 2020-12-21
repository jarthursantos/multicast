import { IDepartment } from '~/domain/IDepartment'
import { winthor } from '~/libraries/WinThor'

import { IDepartmentsModel } from './IDepartmentsModel'

export function createWinThorDepartmentsModel(): IDepartmentsModel {
  return {
    async findById(id: number): Promise<IDepartment> {
      const response = await winthor.raw<IDepartment[]>(`
        SELECT PCDEPTO.CODEPTO   AS "code",
               PCDEPTO.DESCRICAO AS "name"
        FROM PCDEPTO
        WHERE PCDEPTO.CODEPTO <> 9999
          AND PCDEPTO.CODEPTO = ${id}
        ORDER BY PCDEPTO.DESCRICAO
      `)

      return response[0]
    },

    async findMany(): Promise<IDepartment[]> {
      const response = await winthor.raw<IDepartment[]>(`
        SELECT PCDEPTO.CODEPTO   AS "code",
               PCDEPTO.DESCRICAO AS "name"
        FROM PCDEPTO
        WHERE PCDEPTO.CODEPTO <> 9999
        ORDER BY PCDEPTO.DESCRICAO
      `)

      return response
    }
  }
}
