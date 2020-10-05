import { PrismaLastPurchaseOrderProvider } from 'providers/implementations/PrismaLastPurchaseOrderProvider'
import { PrismaAccompanimentsRepository } from 'repositories/implementations/PrismaAccompanimentsRepository'
import { PrismaAnnotationsRepository } from 'repositories/implementations/PrismaAnnotationsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorPurchaseOrderRepository } from 'repositories/implementations/WinThorPurchaseOrderRepository'

import { UpdateAccompanimentsController } from './UpdateAccompanimentsController'
import { updateAccompanimentsSchema } from './UpdateAccompanimentsSchema'
import { UpdateAccompanimentsUseCase } from './UpdateAccompanimentsUseCase'

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
