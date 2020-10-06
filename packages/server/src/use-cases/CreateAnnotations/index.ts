import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { CreateAnnotationsController } from './CreateAnnotationsController'
import { CreateAnnotationsUseCase } from './CreateAnnotationsUseCase'

const prismaLastPurchaseOrderProvider = new PrismaLastPurchaseOrderProvider()

const winThorPurchaseOrderRepository = new WinThorPurchaseOrderRepository(
  prismaLastPurchaseOrderProvider
)

const prismaUsersRepository = new PrismaUsersRepository()

const prismaAnnotationsRepository = new PrismaAnnotationsRepository(
  prismaUsersRepository
)

const primsaAccompanimentsRepository = new PrismaAccompanimentsRepository(
  winThorPurchaseOrderRepository,
  prismaAnnotationsRepository
)

const createAnnotationsUseCase = new CreateAnnotationsUseCase(
  prismaAnnotationsRepository,
  primsaAccompanimentsRepository
)

const createAnnotationsController = new CreateAnnotationsController(
  createAnnotationsUseCase
)

export { createAnnotationsUseCase, createAnnotationsController }
