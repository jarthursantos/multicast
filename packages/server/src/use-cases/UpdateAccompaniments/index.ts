import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { UpdateAccompanimentsController } from './UpdateAccompanimentsController'
import { updateAccompanimentsSchema } from './UpdateAccompanimentsSchema'
import { UpdateAccompanimentsUseCase } from './UpdateAccompanimentsUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const updateAccompanimentsUseCase = new UpdateAccompanimentsUseCase(
  prismaAccompanimentsRepository
)

const updateAccompanimentsController = new UpdateAccompanimentsController(
  updateAccompanimentsUseCase
)

export {
  updateAccompanimentsSchema,
  updateAccompanimentsUseCase,
  updateAccompanimentsController
}
