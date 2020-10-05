import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { MarkAccompanimentAsReviewedController } from './MarkAccompanimentAsReviewedController'
import { MarkAccompanimentAsReviewedUseCase } from './MarkAccompanimentAsReviewedUseCase'

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
