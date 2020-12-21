import { createPrismaFilesModel } from '~/models/files/PrismaFilesModel'
import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createPrismaInvoicesModel } from '~/models/invoices/PrismaInvoicesModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaScheduleInvoicesModel } from '~/models/schedule-invoices/PrismaScheduleInvoicesModel'
import { createPrismaSchedulesModel } from '~/models/schedules/PrismaSchedulesModel'
import { createHBSScheduleInvoiceReceiptProvider } from '~/providers/schedule-invoice-receipt/HBSScheduleInvoiceReceiptProvider'
import { createManualScheduleSituationsProvider } from '~/providers/schedule-situations/ManualScheduleSituationsProvider'

import { createCancelScheduleInvoicesModule } from './cancel'
import { createCreateScheduleInvoicesModule } from './create'
import { createDeleteScheduleInvoicesModule } from './delete'
import { createMarkScheduleInvoiceAsNonReceived } from './mark-as-non-received'
import { createMarkScheduleInvoiceAsReceived } from './mark-as-received'
import { createMoveScheduleInvoicesModule } from './move'
import { createScheduleInvoiceReceiptModule } from './receipt'
import { createUpdateScheduleInvoicesModule } from './update'

const providersModel = createWinThorProvidersModel()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()
const scheduleInvoicesModel = createPrismaScheduleInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const scheduleSituationsProvider = createManualScheduleSituationsProvider()
const schedulesModel = createPrismaSchedulesModel(
  scheduleInvoicesModel,
  scheduleSituationsProvider
)
const invoicesModel = createPrismaInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const filesModel = createPrismaFilesModel()
const scheduleInvoiceReceiptProvider = createHBSScheduleInvoiceReceiptProvider(
  filesModel
)

const createScheduleInvoicesModule = createCreateScheduleInvoicesModule(
  schedulesModel
)
const updateScheduleInvoicesModule = createUpdateScheduleInvoicesModule(
  schedulesModel
)
const deleteScheduleInvoicesModule = createDeleteScheduleInvoicesModule(
  schedulesModel
)
const cancelScheduleInvoicesModule = createCancelScheduleInvoicesModule(
  schedulesModel
)
const moveScheduleInvoicesModule = createMoveScheduleInvoicesModule(
  schedulesModel
)
const markScheduleInvoiceAsNonReceived = createMarkScheduleInvoiceAsNonReceived(
  schedulesModel,
  invoicesModel
)
const markScheduleInvoiceAsReceived = createMarkScheduleInvoiceAsReceived(
  schedulesModel,
  invoicesModel
)
const scheduleInvoiceReceiptModule = createScheduleInvoiceReceiptModule(
  schedulesModel,
  invoicesModel,
  scheduleInvoiceReceiptProvider
)

export {
  createScheduleInvoicesModule,
  updateScheduleInvoicesModule,
  deleteScheduleInvoicesModule,
  cancelScheduleInvoicesModule,
  moveScheduleInvoicesModule,
  markScheduleInvoiceAsNonReceived,
  markScheduleInvoiceAsReceived,
  scheduleInvoiceReceiptModule
}
