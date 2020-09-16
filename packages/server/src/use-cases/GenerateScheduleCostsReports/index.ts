import { HBSCostPerPeriodProvider } from 'providers/implementations/HBSCostPerPeriodProvider'
import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaFilesRepository } from 'repositories/implementations/PrismaFilesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { GenerateScheduleCostsReportsController } from './GenerateScheduleCostsReportsController'
import { generateScheduleCostsReportsSchema } from './GenerateScheduleCostsReportsSchema'
import { GenerateScheduleCostsReportsUseCase } from './GenerateScheduleCostsReportsUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const scheduleSituationProvider = new ScheduleSituationsProvider()

const prismaSchedulesRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationProvider
)

const prismaFilesRepository = new PrismaFilesRepository()

const hbsCostPerPeriodProvider = new HBSCostPerPeriodProvider(
  prismaFilesRepository
)

const generateScheduleCostsReportsUseCase = new GenerateScheduleCostsReportsUseCase(
  prismaSchedulesRepository,
  hbsCostPerPeriodProvider
)

const generateScheduleCostsReportsController = new GenerateScheduleCostsReportsController(
  generateScheduleCostsReportsUseCase
)

export {
  generateScheduleCostsReportsController,
  generateScheduleCostsReportsUseCase,
  generateScheduleCostsReportsSchema
}
