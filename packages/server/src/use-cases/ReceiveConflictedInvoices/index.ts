import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { ReceiveConflictedInvoicesController } from './ReceiveConflictedInvoicesController'
import { ReceiveConflictedInvoicesUseCase } from './ReceiveConflictedInvoicesUseCase'

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

const receiveConflictedInvoicesUseCase = new ReceiveConflictedInvoicesUseCase(
  prismaSchedulesRepository,
  prismaInvoicesRepository
)

const receiveConflictedInvoicesController = new ReceiveConflictedInvoicesController(
  receiveConflictedInvoicesUseCase
)

export { receiveConflictedInvoicesUseCase, receiveConflictedInvoicesController }
