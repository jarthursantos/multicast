import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaDischargeTableRepository } from 'repositories/implementations/PrismaDischargeTableRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { ReceiveSchedulesController } from './ReceiveSchedulesController'
import { receiveSchedulesSchema } from './ReceiveSchedulesSchema'
import { ReceiveSchedulesUseCase } from './ReceiveSchedulesUseCase'

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

const prismaDischargeTableRepository = new PrismaDischargeTableRepository()

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const receiveSchedulesUseCase = new ReceiveSchedulesUseCase(
  prismaSchedulesRepository,
  prismaDischargeTableRepository,
  prismaInvoicesRepository
)

const receiveSchedulesController = new ReceiveSchedulesController(
  receiveSchedulesUseCase
)

export {
  receiveSchedulesUseCase,
  receiveSchedulesController,
  receiveSchedulesSchema
}
