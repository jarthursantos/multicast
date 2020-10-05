import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrimsaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { FindAccompanimentByIdController } from './FindAccompanimentByIdController'
import { FindAccompanimentByIdUseCase } from './FindAccompanimentByIdUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaAccompanimentsRepository = new PrimsaAccompanimentsRepository(
  winThorPurchaseOrderRepository
)

const findAccompanimentByIdUseCase = new FindAccompanimentByIdUseCase(
  prismaAccompanimentsRepository
)

const findAccompanimentByIdController = new FindAccompanimentByIdController(
  findAccompanimentByIdUseCase
)

export { findAccompanimentByIdUseCase, findAccompanimentByIdController }
