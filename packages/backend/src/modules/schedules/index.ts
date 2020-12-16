import { createPrismaDischargeTablesModel } from '~/models/dischage-tables/PrismaDischargeTablesModel'
import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createPrismaInvoicesModel } from '~/models/invoices/PrismaInvoicesModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaRescheduleInvocesModel } from '~/models/reschedule-invoices/PrismaRescheduleInvoicesModel'
import { createPrismaRescheduleSchedulesModel } from '~/models/reschedule/PrismaRescheduleSchedulesModel'
import { createPrismaScheduleInvoicesModel } from '~/models/schedule-invoices/PrismaScheduleInvoicesModel'
import { createPrismaSchedulesModel } from '~/models/schedules/PrismaSchedulesModel'
import { createManualScheduleSituationsProvider } from '~/providers/schedule-situations/ManualScheduleSituationsProvider'

import { createCancelSchedulesModule } from './cancel'
import { createCloseSchedulesModule } from './close'
import { createCreateSchedulesModule } from './create'
import { createSchedulesSchema } from './create/schema'
import { createDeleteSchedulesModule } from './delete'
import { createFindAllSchedulesModule } from './find-all'
import { createReceiveSchedulesModule } from './receive'
import { receiveSchedulesSchema } from './receive/schema'
import { createRescheduleSchedulesModule } from './reschedule'
import { rescheduleSchedulesSchema } from './reschedule/schema'
import { createSearchSchedulesModule } from './search'
import { createUpdateSchedulesModule } from './update'
import { updateSchedulesSchema } from './update/schema'

const providersModel = createWinThorProvidersModel()
const scheduleSituationsProvider = createManualScheduleSituationsProvider()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()
const scheduleInvoicesModel = createPrismaScheduleInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const schedulesModel = createPrismaSchedulesModel(
  scheduleInvoicesModel,
  scheduleSituationsProvider
)
const dischargeTablesModel = createPrismaDischargeTablesModel()
const scheduleSitationsProvider = createManualScheduleSituationsProvider()
const invoicesModel = createPrismaInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const rescheduleInvoicesModel = createPrismaRescheduleInvocesModel(
  invoicesModel,
  schedulesModel
)
const rescheduleSchedulesModel = createPrismaRescheduleSchedulesModel(
  scheduleInvoicesModel,
  scheduleSitationsProvider,
  rescheduleInvoicesModel
)

const createSchedulesModule = createCreateSchedulesModule(
  schedulesModel,
  dischargeTablesModel
)
const findAllSchedulesModule = createFindAllSchedulesModule(schedulesModel)
const receiveSchedulesModule = createReceiveSchedulesModule(
  schedulesModel,
  invoicesModel,
  dischargeTablesModel
)
const updateSchedulesModule = createUpdateSchedulesModule(schedulesModel)
const rescheduleSchedulesModule = createRescheduleSchedulesModule(
  schedulesModel,
  rescheduleSchedulesModel
)
const closeSchedulesModule = createCloseSchedulesModule(schedulesModel)
const cancelSchedulesModule = createCancelSchedulesModule(
  schedulesModel,
  invoicesModel,
  scheduleInvoicesModel
)
const deleteSchedulesModule = createDeleteSchedulesModule(
  schedulesModel,
  invoicesModel,
  scheduleInvoicesModel
)
const searchSchedulesModule = createSearchSchedulesModule(schedulesModel)

export {
  createSchedulesModule,
  createSchedulesSchema,
  findAllSchedulesModule,
  updateSchedulesModule,
  updateSchedulesSchema,
  rescheduleSchedulesModule,
  rescheduleSchedulesSchema,
  closeSchedulesModule,
  cancelSchedulesModule,
  deleteSchedulesModule,
  searchSchedulesModule,
  receiveSchedulesModule,
  receiveSchedulesSchema
}

export * from './find-all/parser'
export * from './search/parser'
