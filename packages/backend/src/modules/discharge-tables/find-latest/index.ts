import createHttpError from 'http-errors'

import { IDisachargeTablesModel } from '~/models/dischage-tables/IDisachargeTablesModel'

export function createFindLatestDischargeTableModule(
  dischargeTablesModel: IDisachargeTablesModel
) {
  return {
    async execute() {
      const dischargeTable = await dischargeTablesModel.findLatest()

      if (!dischargeTable) {
        throw new createHttpError.NotFound(
          'Nenhuma tabela de descarrego cadastrada'
        )
      }

      return dischargeTable
    }
  }
}
