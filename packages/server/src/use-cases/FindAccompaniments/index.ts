import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { FindAccompanimentsController } from './FindAccompanimentsController'
import { FindAccompanimentsUseCase } from './FindAccompanimentsUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const findAccompanimentsUseCase = new FindAccompanimentsUseCase(
  winThorPurchaseOrderRepository,
  prismaAccompanimentsRepository
)

const findAccompanimentsController = new FindAccompanimentsController(
  findAccompanimentsUseCase
)

export { findAccompanimentsUseCase, findAccompanimentsController }
