import { createPrismaFilesModel } from '~/models/files/PrismaFilesModel'
import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaScheduleInvoicesModel } from '~/models/schedule-invoices/PrismaScheduleInvoicesModel'
import { createPrismaSchedulesModel } from '~/models/schedules/PrismaSchedulesModel'
import { createHBSCostsPerPeriodProvider } from '~/providers/costs-per-period/HBSCostsPerPeriodProvider'
import { createManualScheduleSituationsProvider } from '~/providers/schedule-situations/ManualScheduleSituationsProvider'

import { createScheduleCostsReportModule } from './report'

const providersModel = createWinThorProvidersModel()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()
const filesModel = createPrismaFilesModel()
const costsPerPeriodProvider = createHBSCostsPerPeriodProvider(filesModel)

const scheduleInvoicesModel = createPrismaScheduleInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const scheduleSituationsProvider = createManualScheduleSituationsProvider()

const schedulesModel = createPrismaSchedulesModel(
  scheduleInvoicesModel,
  scheduleSituationsProvider
)

const scheduleCostsReportModule = createScheduleCostsReportModule(
  schedulesModel,
  costsPerPeriodProvider
)

export { scheduleCostsReportModule }
export * from './report/parser'
