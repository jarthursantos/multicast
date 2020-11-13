import { HBSAccompanimentMailMessageProvider } from 'providers/implementations/HBSAccompanimentMailMessageProvider'
import { HBSAccompanimentReportProvider } from 'providers/implementations/HBSAccompanimentReportProvider'
import { ManualAccompanimentDelayProvider } from 'providers/implementations/ManualAccompanimentDelayProvider'
import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaFilesRepository } from 'repositories/implementations/PrismaFilesRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorAccompanimentProductsRepository } from 'repositories/implementations/WinThorAccompanimentProductsRepository'
import { WinThorAccompanimentReportDeadlineRepository } from 'repositories/implementations/WinThorAccompanimentReportDeadlineRepository'
import { WinThorAccompanimentReportHeaderRepository } from 'repositories/implementations/WinThorAccompanimentReportHeaderRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorInvoicesWithoutAccompanimentsRepository } from 'repositories/implementations/WinThorInvoicesWithoutAccompanimentsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { GenerateAccompanimentPDFController } from './GenerateAccompanimentPDFController'
import { GenerateAccompanimentPDFUseCase } from './GenerateAccompanimentPDFUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaUsersRepository = new PrismaUsersRepository()

const prismaAnnotationsRepository = new PrismaAnnotationsRepository(
  prismaUsersRepository
)

const winThorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winThorProviderRepository,
  winThorInvoiceSituationsRepository
)

const winThorInvoicesWithoutAccompanimentsRepository = new WinThorInvoicesWithoutAccompanimentsRepository()

const manualAccompanimentDelayProvider = new ManualAccompanimentDelayProvider()

const prismaAccompanimentsRepository = new PrismaAccompanimentsRepository(
  winThorPurchaseOrderRepository,
  prismaAnnotationsRepository,
  prismaInvoicesRepository,
  winThorInvoicesWithoutAccompanimentsRepository,
  manualAccompanimentDelayProvider
)

const winThorAccompanimentReportHeaderRepository = new WinThorAccompanimentReportHeaderRepository()

const winThorAccompanimentProductsRepository = new WinThorAccompanimentProductsRepository()

const winThorAccompanimentReportDeadlineRepository = new WinThorAccompanimentReportDeadlineRepository()

const prismaFilesRepository = new PrismaFilesRepository()

const hbsAccompanimentReportProvider = new HBSAccompanimentReportProvider(
  winThorAccompanimentReportHeaderRepository,
  winThorAccompanimentProductsRepository,
  winThorAccompanimentReportDeadlineRepository,
  prismaFilesRepository
)

const hbsAccompanimentMailMessageProvider = new HBSAccompanimentMailMessageProvider(
  hbsAccompanimentReportProvider
)

const generateAccompanimentPDFUseCase = new GenerateAccompanimentPDFUseCase(
  prismaAccompanimentsRepository,
  hbsAccompanimentMailMessageProvider
)

const generateAccompanimentPDFController = new GenerateAccompanimentPDFController(
  generateAccompanimentPDFUseCase
)

export { generateAccompanimentPDFUseCase, generateAccompanimentPDFController }
