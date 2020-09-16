import { HBSReceiptScheduleProvider } from 'providers/implementations/HBSReceiptScheduleProvider'
import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaFilesRepository } from 'repositories/implementations/PrismaFilesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { GenerateScheduleReceiptsController } from './GenerateScheduleReceiptsController'
import { GenerateScheduleReceiptsUseCase } from './GenerateScheduleReceiptsUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaScheduleInvoicesRepository = new PrismaScheduleInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const scheduleSituationProvider = new ScheduleSituationsProvider()

const prismaScheduleRepository = new PrismaSchedulesRepository(
  prismaScheduleInvoicesRepository,
  scheduleSituationProvider
)

const prismaFilesRepository = new PrismaFilesRepository()

const hbsReceiptScheduleProvider = new HBSReceiptScheduleProvider(
  prismaFilesRepository
)

const generateScheduleReceiptsUseCase = new GenerateScheduleReceiptsUseCase(
  prismaScheduleRepository,
  hbsReceiptScheduleProvider
)

const generateScheduleReceiptsController = new GenerateScheduleReceiptsController(
  generateScheduleReceiptsUseCase
)

export { generateScheduleReceiptsController, generateScheduleReceiptsUseCase }
