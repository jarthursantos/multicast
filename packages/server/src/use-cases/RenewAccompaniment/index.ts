import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaRenewAccompanimentRepository } from 'repositories/implementations/PrismaRenewAccompanimentRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorInvoicesWithoutAccompanimentsRepository } from 'repositories/implementations/WinThorInvoicesWithoutAccompanimentsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { RenewAccompanimentController } from './RenewAccompanimentController'
import { RenewAccompanimentUseCase } from './RenewAccompanimentUseCase'

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

const prismaAccompanimentsRepository = new PrismaAccompanimentsRepository(
  winThorPurchaseOrderRepository,
  prismaAnnotationsRepository,
  prismaInvoicesRepository,
  winThorInvoicesWithoutAccompanimentsRepository
)

const prismaRenewAccompanimentRepository = new PrismaRenewAccompanimentRepository(
  prismaAccompanimentsRepository
)

const renewAccompanimentUseCase = new RenewAccompanimentUseCase(
  prismaAccompanimentsRepository,
  prismaRenewAccompanimentRepository
)

const renewAccompanimentController = new RenewAccompanimentController(
  renewAccompanimentUseCase
)

export { renewAccompanimentUseCase, renewAccompanimentController }
