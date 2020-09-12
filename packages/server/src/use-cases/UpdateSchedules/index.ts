import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { MongoScheduleHistoryRepository } from 'repositories/implementations/MongoScheduleHistoryRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { UpdateSchedulesController } from './UpdateSchedulesController'
import { updateSchedulesSchema } from './UpdateSchedulesSchema'
import { UpdateSchedulesUseCase } from './UpdateSchedulesUseCase'

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

const prismaUsersRepository = new PrismaUsersRepository()

const mongoScheduleHistoryRepository = new MongoScheduleHistoryRepository(
  prismaUsersRepository
)

const updateScheduleUseCase = new UpdateSchedulesUseCase(
  prismaScheduleRepository,
  mongoScheduleHistoryRepository
)

const updateSchedulesController = new UpdateSchedulesController(
  updateScheduleUseCase
)

export {
  updateScheduleUseCase,
  updateSchedulesController,
  updateSchedulesSchema
}
