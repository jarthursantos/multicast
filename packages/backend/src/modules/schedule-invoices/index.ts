import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaScheduleInvoicesModel } from '~/models/schedule-invoices/PrismaScheduleInvoicesModel'
import { createPrismaSchedulesModel } from '~/models/schedules/PrismaSchedulesModel'
import { createManualScheduleSituationsProvider } from '~/providers/schedule-situations/ManualScheduleSituationsProvider'

import { createCancelScheduleInvoicesModule } from './cancel'
import { createCreateScheduleInvoicesModule } from './create'
import { createDeleteScheduleInvoicesModule } from './delete'
import { createMoveScheduleInvoicesModule } from './move'
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

export {
  createScheduleInvoicesModule,
  updateScheduleInvoicesModule,
  deleteScheduleInvoicesModule,
  cancelScheduleInvoicesModule,
  moveScheduleInvoicesModule
}
