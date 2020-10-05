import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { MarkAccompanimentAsSendedController } from './MarkAccompanimentAsSendedController'
import { MarkAccompanimentAsSendedUseCase } from './MarkAccompanimentAsSendedUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const markAccompanimentAsSendedUseCase = new MarkAccompanimentAsSendedUseCase(
  prismaAccompanimentsRepository
)

const markAccompanimentAsSendedController = new MarkAccompanimentAsSendedController(
  markAccompanimentAsSendedUseCase
)

export { markAccompanimentAsSendedUseCase, markAccompanimentAsSendedController }
