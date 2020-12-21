import { createDischargeTable } from '~/domain/IDischargeTable'
import { IDisachargeTablesModel } from '~/models/dischage-tables/IDisachargeTablesModel'

import { ICreateDischargeTableDTO } from './dto'

export function createCreateDischargeTablesModule(
  dischargeTablesModel: IDisachargeTablesModel
) {
  return {
    async execute(data: ICreateDischargeTableDTO) {
      const dischargeTable = createDischargeTable(data)

      await dischargeTablesModel.save(dischargeTable)

      return dischargeTable
    }
  }
}
