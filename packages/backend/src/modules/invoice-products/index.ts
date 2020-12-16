import { createWinThorInvoiceProductsModel } from '~/models/invoice-products/WinThorInvoiceProductsModel'
import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createPrismaInvoicesModel } from '~/models/invoices/PrismaInvoicesModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'

import { createFindInvoiceProductsModule } from './find'

const providersModel = createWinThorProvidersModel()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()
const winThorInvoiceProductsModel = createWinThorInvoiceProductsModel(
  providersModel
)
const invoicesModel = createPrismaInvoicesModel(
  providersModel,
  invoiceSituationsModel
)

const findInvoiceProductsModule = createFindInvoiceProductsModule(
  invoicesModel,
  winThorInvoiceProductsModel
)

export { findInvoiceProductsModule }
