import { MongoInvoiceHistoryRepository } from 'repositories/implementations/MongoInvoiceHistoryRepository'
import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { createInvoicesSchema } from './CreateInvoicesSchema'
import { CreateInvoicesUseCase } from './CreateInvoicesUseCase'

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

const createInvoicesUseCase = new CreateInvoicesUseCase(
  prismaInvoicesRepository,
  winthorProviderRepository,
  winThorInvoiceSituationsRepository,
  mongoInvoiceHistoryRepository
)

export { createInvoicesUseCase, createInvoicesSchema }
