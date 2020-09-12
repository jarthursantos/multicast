import { PrismaInvoicesRepository } from 'repositories/implementations/PrismaInvoicesRepository'
import { WinThorInvoiceProductsRepository } from 'repositories/implementations/WinThorInvoiceProductsRepository'
import { WinThorInvoiceSituationsRepository } from 'repositories/implementations/WinThorInvoiceSituationsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { FindInvoiceProductsController } from './FindInvoiceProductsController'
import { FindInvoiceProductsUseCase } from './FindInvoiceProductsUseCase'

const winthorProviderRepository = new WinThorProviderRepository()

const winThorInvoiceSituationsRepository = new WinThorInvoiceSituationsRepository()

const prismaInvoiceRepository = new PrismaInvoicesRepository(
  winthorProviderRepository,
  winThorInvoiceSituationsRepository
)

const winthorInvoiceProductsRepository = new WinThorInvoiceProductsRepository(
  winthorProviderRepository
)

const findInvoiceProductsUseCase = new FindInvoiceProductsUseCase(
  prismaInvoiceRepository,
  winthorInvoiceProductsRepository
)

const findInvoiceProductsController = new FindInvoiceProductsController(
  findInvoiceProductsUseCase
)

export { findInvoiceProductsUseCase, findInvoiceProductsController }
