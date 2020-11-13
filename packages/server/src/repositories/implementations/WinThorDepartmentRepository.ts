import { Department } from 'entities/Department'
import { winthor } from 'libs/knex-winthor'
import { IDepartmentRepository } from 'repositories/IDepartmentRepository'

export class WinThorDepartmentRepository implements IDepartmentRepository {
  async findById(id: number): Promise<Department> {
    const response = await winthor.raw<Department[]>(`
      SELECT PCDEPTO.CODEPTO   AS "code",
             PCDEPTO.DESCRICAO AS "name"
      FROM PCDEPTO
      WHERE PCDEPTO.CODEPTO <> 9999
        AND PCDEPTO.CODEPTO = ${id}
      ORDER BY PCDEPTO.DESCRICAO
    `)

    return response[0]
  }

  async findMany(): Promise<Department[]> {
    const response = await winthor.raw<Department[]>(`
      SELECT PCDEPTO.CODEPTO   AS "code",
             PCDEPTO.DESCRICAO AS "name"
      FROM PCDEPTO
      WHERE PCDEPTO.CODEPTO <> 9999
      ORDER BY PCDEPTO.DESCRICAO
    `)

    return response
  }
}
