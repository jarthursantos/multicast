import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { NonReceiveConflictedInvoicesController } from './NonReceiveConflictedInvoicesController'
import { NonReceiveConflictedInvoicesUseCase } from './NonReceiveConflictedInvoicesUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const scheduleSituationsProvider = new ScheduleSituationsProvider()

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaSchedulesRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationsProvider
)

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const nonReceiveConflictedInvoicesUseCase = new NonReceiveConflictedInvoicesUseCase(
  prismaSchedulesRepository,
  prismaInvoicesRepository
)

const nonReceiveConflictedInvoicesController = new NonReceiveConflictedInvoicesController(
  nonReceiveConflictedInvoicesUseCase
)

export {
  nonReceiveConflictedInvoicesUseCase,
  nonReceiveConflictedInvoicesController
}
