import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createPrismaInvoicesModel } from '~/models/invoices/PrismaInvoicesModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'

import { createCancelInvoicesModule } from './cancel'
import { createCreateInvoicesModule } from './create'
import { createInvoicesSchema } from './create/schema'
import { createDeleteInvoicesModule } from './delete'
import { createMoveInvoicesModule } from './move'
import { createUpdateInvoicesModule } from './update'
import { updateInvoicesSchema } from './update/schema'

const providersModel = createWinThorProvidersModel()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()

const invoicesModel = createPrismaInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const createInvoicesModule = createCreateInvoicesModule(
  invoicesModel,
  providersModel,
  invoiceSituationsModel
)
const updateInvoicesModule = createUpdateInvoicesModule(
  invoicesModel,
  providersModel
)
const deleteInvoicesModule = createDeleteInvoicesModule(invoicesModel)
const cancelInvoicesModule = createCancelInvoicesModule(invoicesModel)
const moveInvoicesModule = createMoveInvoicesModule(invoicesModel)

export {
  createInvoicesModule,
  createInvoicesSchema,
  updateInvoicesModule,
  updateInvoicesSchema,
  deleteInvoicesModule,
  cancelInvoicesModule,
  moveInvoicesModule
}
