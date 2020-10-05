import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { CreateAnnotationsController } from './CreateAnnotationsController'
import { CreateAnnotationsUseCase } from './CreateAnnotationsUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const primsaAccompanimentsRepository = new PrismaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const prismaAnnotationsRepository = new PrismaAnnotationsRepository()

const createAnnotationsUseCase = new CreateAnnotationsUseCase(
  prismaAnnotationsRepository,
  primsaAccompanimentsRepository
)

const createAnnotationsController = new CreateAnnotationsController(
  createAnnotationsUseCase
)

export { createAnnotationsUseCase, createAnnotationsController }
