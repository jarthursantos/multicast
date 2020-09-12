import { PrismaDischargeTableRepository } from 'repositories/implementations/PrismaDischargeTableRepository'

import { FindDischargeTablesController } from './FindDischargeTablesController'
import { FindDischargeTablesUseCase } from './FindDischargeTablesUseCase'

const prismaDischargeTableRepository = new PrismaDischargeTableRepository()

const findDischargeTablesUseCase = new FindDischargeTablesUseCase(
  prismaDischargeTableRepository
)

const findDischargeTablesController = new FindDischargeTablesController(
  findDischargeTablesUseCase
)

export { findDischargeTablesController, findDischargeTablesUseCase }
