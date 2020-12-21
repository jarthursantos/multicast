import { createPrismaDischargeTablesModel } from '~/models/dischage-tables/PrismaDischargeTablesModel'

import { createCreateDischargeTablesModule } from './create'
import { createDischargeTableSchema } from './create/schema'
import { createFindLatestDischargeTableModule } from './find-latest'

const dischargeTablesModel = createPrismaDischargeTablesModel()

const findLatestDischargeTableModule = createFindLatestDischargeTableModule(
  dischargeTablesModel
)

const createDischargeTablesModule = createCreateDischargeTablesModule(
  dischargeTablesModel
)

export {
  createDischargeTablesModule,
  createDischargeTableSchema,
  findLatestDischargeTableModule
}
