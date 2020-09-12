import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { CreateScheduleInvoicesController } from './CreateScheduleInvoicesController'
import { CreateScheduleInvoicesUseCase } from './CreateScheduleInvoicesUseCase'

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

const createScheduleInvoicesUseCase = new CreateScheduleInvoicesUseCase(
  prismaSchedulesRepository
)

const createScheduleInvoicesController = new CreateScheduleInvoicesController(
  createScheduleInvoicesUseCase
)

export { createScheduleInvoicesUseCase, createScheduleInvoicesController }
