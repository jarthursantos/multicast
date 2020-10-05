import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { MarkAccompanimentAsSendedController } from './MarkAccompanimentAsSendedController'
import { MarkAccompanimentAsSendedUseCase } from './MarkAccompanimentAsSendedUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaUsersRepository = new PrismaUsersRepository()

const prismaAnnotationsRepository = new PrismaAnnotationsRepository(
  prismaUsersRepository
)

const prismaAccompanimentsRepository = new PrismaAccompanimentsRepository(
  winThorPurchaseOrderRepository,
  prismaAnnotationsRepository
)

const markAccompanimentAsSendedUseCase = new MarkAccompanimentAsSendedUseCase(
  prismaAccompanimentsRepository
)

const markAccompanimentAsSendedController = new MarkAccompanimentAsSendedController(
  markAccompanimentAsSendedUseCase
)

export { markAccompanimentAsSendedUseCase, markAccompanimentAsSendedController }
