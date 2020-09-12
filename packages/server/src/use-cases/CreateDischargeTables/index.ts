import { PrismaDischargeTableRepository } from 'repositories/implementations/PrismaDischargeTableRepository'

import { CreateDischargeTableController } from './CreateDischargeTableController'
import { createDischargeTableSchema } from './CreateDischargeTableSchema'
import { CreateDischargeTableUseCase } from './CreateDischargeTableUseCase'

const prismaDischargeTableRepository = new PrismaDischargeTableRepository()

const createDischargeTableUseCase = new CreateDischargeTableUseCase(
  prismaDischargeTableRepository
)

const createDischargeTableController = new CreateDischargeTableController(
  createDischargeTableUseCase
)

export {
  createDischargeTableUseCase,
  createDischargeTableController,
  createDischargeTableSchema
}
