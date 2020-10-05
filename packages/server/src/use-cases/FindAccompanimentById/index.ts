import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { FindAccompanimentByIdController } from './FindAccompanimentByIdController'
import { FindAccompanimentByIdUseCase } from './FindAccompanimentByIdUseCase'

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

const findAccompanimentByIdUseCase = new FindAccompanimentByIdUseCase(
  prismaAccompanimentsRepository
)

const findAccompanimentByIdController = new FindAccompanimentByIdController(
  findAccompanimentByIdUseCase
)

export { findAccompanimentByIdUseCase, findAccompanimentByIdController }
