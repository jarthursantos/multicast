import { Employee } from 'entities/Employee'
import { winthor } from 'libs/knex-winthor'
import { IEmployeeRepository } from 'repositories/IEmployeeRepository'

export class WinThorEmployeeRepository implements IEmployeeRepository {
  async search(param: string): Promise<Employee[]> {
    const employees = await winthor
      .select<Employee[]>(
        'MATRICULA as code',
        'NOME as name',
        'PCSETOR.DESCRICAO as sector',
        'FUNCAO as func',
        'TIPO as type',
        'SITUACAO as situation'
      )
      .from('PCEMPR')
      .leftJoin('PCSETOR', 'PCSETOR.CODSETOR', 'PCEMPR.CODSETOR')
      .whereRaw(`NOME LIKE '%${param}%'`)

    return employees
  }
}
