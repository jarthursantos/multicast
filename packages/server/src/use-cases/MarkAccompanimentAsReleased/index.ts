import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { MarkAccompanimentAsReleasedController } from './MarkAccompanimentAsReleasedController'
import { MarkAccompanimentAsReleasedUseCase } from './MarkAccompanimentAsReleasedUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const markAccompanimentAsReleasedUseCase = new MarkAccompanimentAsReleasedUseCase(
  prismaAccompanimentsRepository
)

const markAccompanimentAsReleasedController = new MarkAccompanimentAsReleasedController(
  markAccompanimentAsReleasedUseCase
)

export {
  markAccompanimentAsReleasedUseCase,
  markAccompanimentAsReleasedController
}
