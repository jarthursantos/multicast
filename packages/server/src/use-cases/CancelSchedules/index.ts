import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { CancelSchedulesController } from './CancelSchedulesController'
import { cancelSchedulesSchema } from './CancelSchedulesSchema'
import { CancelSchedulesUseCase } from './CancelSchedulesUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()
const scheduleSituationsProvider = new ScheduleSituationsProvider()

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaSchedulesRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationsProvider
)

const cancelSchedulesUseCase = new CancelSchedulesUseCase(
  prismaSchedulesRepository,
  prismaScheduleInvoicesRepository,
  prismaInvoicesRepository
)

const cancelSchedulesController = new CancelSchedulesController(
  cancelSchedulesUseCase
)

export {
  cancelSchedulesUseCase,
  cancelSchedulesSchema,
  cancelSchedulesController
}
