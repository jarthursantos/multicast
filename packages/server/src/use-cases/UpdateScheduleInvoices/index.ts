import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { UpdateScheduleInvoicesController } from './UpdateScheduleInvoicesController'
import { UpdateScheduleInvoicesUseCase } from './UpdateScheduleInvoicesUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const scheduleSituationsProvider = new ScheduleSituationsProvider()

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaSchedulesRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationsProvider
)

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const updateScheduleInvoicesUseCase = new UpdateScheduleInvoicesUseCase(
  prismaSchedulesRepository,
  prismaInvoicesRepository
)

const updateScheduleInvoicesController = new UpdateScheduleInvoicesController(
  updateScheduleInvoicesUseCase
)

export { updateScheduleInvoicesUseCase, updateScheduleInvoicesController }
