import { IEmployee } from '~/domain/IEmployee'
import { winthor } from '~/libraries/WinThor'

import { IEmployeesModel } from './IEmployeesModel'

export function createWinThorEmployeesModel(): IEmployeesModel {
  return {
    async search(param: string): Promise<IEmployee[]> {
      const employees = await winthor
        .select<IEmployee[]>(
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
}
