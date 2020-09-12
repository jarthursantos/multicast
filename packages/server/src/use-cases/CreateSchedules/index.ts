import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { MongoScheduleHistoryRepository } from 'repositories/implementations/MongoScheduleHistoryRepository'
import { PrismaDischargeTableRepository } from 'repositories/implementations/PrismaDischargeTableRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { CreateSchedulesController } from './CreateSchedulesController'
import { createSchedulesSchema } from './CreateSchedulesSchema'
import { CreateSchedulesUseCase } from './CreateSchedulesUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const scheduleSituationsProvider = new ScheduleSituationsProvider()

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaScheduleRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationsProvider
)

const prismaDischargeTableRepository = new PrismaDischargeTableRepository()

const prismaUsersRepository = new PrismaUsersRepository()

const mongoScheduleHistoryRepository = new MongoScheduleHistoryRepository(
  prismaUsersRepository
)

const createSchedulesUseCase = new CreateSchedulesUseCase(
  prismaScheduleRepository,
  prismaDischargeTableRepository,
  mongoScheduleHistoryRepository
)

const createSchedulesController = new CreateSchedulesController(
  createSchedulesUseCase
)

export {
  createSchedulesUseCase,
  createSchedulesController,
  createSchedulesSchema
}
