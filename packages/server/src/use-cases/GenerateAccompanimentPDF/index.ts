import { HBSAccompanimentMailMessageProvider } from 'providers/implementations/HBSAccompanimentMailMessageProvider'
import { ManualAccompanimentDelayProvider } from 'providers/implementations/ManualAccompanimentDelayProvider'
import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
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

const hbsAccompanimentMailMessageProvider = new HBSAccompanimentMailMessageProvider()

const generateAccompanimentPDFUseCase = new GenerateAccompanimentPDFUseCase(
  prismaAccompanimentsRepository,
  hbsAccompanimentMailMessageProvider
)

const generateAccompanimentPDFController = new GenerateAccompanimentPDFController(
  generateAccompanimentPDFUseCase
)

export { generateAccompanimentPDFUseCase, generateAccompanimentPDFController }