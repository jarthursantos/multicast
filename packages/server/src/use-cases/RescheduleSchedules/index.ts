import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaRescheduleInvoicesRepository } from 'repositories/implementations/PrismaRescheduleInvoicesRepository'
import { PrismaRescheduleSchedulesRepository } from 'repositories/implementations/PrismaRescheduleSchedulesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { RescheduleSchedulesController } from './RescheduleSchedulesController'
import { RescheduleSchedulesUseCase } from './RescheduleSchedulesUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const scheduleSitationsProvider = new ScheduleSituationsProvider()

const prismaInvoiceRepository = new PrismaInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaSchedulesRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSitationsProvider
)

const prismaRescheduleInvoicesRepository = new PrismaRescheduleInvoicesRepository(
  prismaInvoiceRepository,
  prismaSchedulesRepository
)

const prismaRescheduleSchedulesRepository = new PrismaRescheduleSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSitationsProvider,
  prismaRescheduleInvoicesRepository
)

const rescheduleSchedulesUseCase = new RescheduleSchedulesUseCase(
  prismaSchedulesRepository,
  prismaRescheduleSchedulesRepository
)

const rescheduleSchedulesController = new RescheduleSchedulesController(
  rescheduleSchedulesUseCase
)

export { rescheduleSchedulesUseCase, rescheduleSchedulesController }
