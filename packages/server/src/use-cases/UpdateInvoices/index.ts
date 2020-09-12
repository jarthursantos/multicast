import { MongoInvoiceHistoryRepository } from 'repositories/implementations/MongoInvoiceHistoryRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { UpdateInvoicesController } from './UpdateInvoicesController'
import { updateInvoicesSchema } from './UpdateInvoicesSchema'
import { UpdateInvoicesUseCase } from './UpdateInvoicesUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaInvoicesRepository = new PrismaInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const prismaUserRepository = new PrismaUsersRepository()

const mongoInvoiceHistoryRepository = new MongoInvoiceHistoryRepository(
  prismaUserRepository
)

const updateInvoicesUseCase = new UpdateInvoicesUseCase(
  prismaInvoicesRepository,
  winthorProviderRepository,
  mongoInvoiceHistoryRepository
)

const updateInvoicesController = new UpdateInvoicesController(
  updateInvoicesUseCase
)

export { updateInvoicesUseCase, updateInvoicesController, updateInvoicesSchema }
