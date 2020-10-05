import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { MarkAccompanimentAsReviewedController } from './MarkAccompanimentAsReviewedController'
import { MarkAccompanimentAsReviewedUseCase } from './MarkAccompanimentAsReviewedUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const markAccompanimentAsReviewedUseCase = new MarkAccompanimentAsReviewedUseCase(
  prismaAccompanimentsRepository
)

const markAccompanimentAsReviewedController = new MarkAccompanimentAsReviewedController(
  markAccompanimentAsReviewedUseCase
)

export {
  markAccompanimentAsReviewedUseCase,
  markAccompanimentAsReviewedController
}
