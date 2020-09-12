import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { CreateConflictedInvoicesController } from './CreateConflictedInvoicesController'
import { CreateConflictedInvoicesUseCase } from './CreateConflictedInvoicesUseCase'

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

const createConflictedInvoicesUseCase = new CreateConflictedInvoicesUseCase(
  prismaSchedulesRepository
)

const createConflictedInvoicesController = new CreateConflictedInvoicesController(
  createConflictedInvoicesUseCase
)

export { createConflictedInvoicesUseCase, createConflictedInvoicesController }
