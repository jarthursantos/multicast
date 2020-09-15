import { HBSRepeiptPerInvoiceProvider } from 'providers/implementations/HBSRepeiptPerInvoiceProvider'
import { ScheduleSituationsProvider } from 'providers/implementations/ScheduleSituationsProvider'
import { PrismaFilesRepository } from 'repositories/implementations/PrismaFilesRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaScheduleInvoicesRepository } from 'repositories/implementations/PrismaScheduleInvoicesRepository'
import { PrismaSchedulesRepository } from 'repositories/implementations/PrismaSchedulesRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { GenerateInvoiceReceiptsController } from './GenerateInvoiceReceiptsController'
import { GenerateInvoiceReceiptsUseCase } from './GenerateInvoiceReceiptsUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaInvoiceRepository = new PrismaInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

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

const hbsReceiptPerInvoiceProvider = new HBSRepeiptPerInvoiceProvider(
  prismaFilesRepository
)

const generateInvoiceReceiptsUseCase = new GenerateInvoiceReceiptsUseCase(
  prismaScheduleRepository,
  prismaInvoiceRepository,
  hbsReceiptPerInvoiceProvider
)

const generateInvoiceReceiptsController = new GenerateInvoiceReceiptsController(
  generateInvoiceReceiptsUseCase
)

export { generateInvoiceReceiptsController, generateInvoiceReceiptsUseCase }
