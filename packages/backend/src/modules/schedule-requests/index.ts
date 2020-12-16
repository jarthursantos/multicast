import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaScheduleRequestsModel } from '~/models/schedule-requests/PrismaScheduleRequestsModel'

import { createCreateScheduleRequestModule } from './create'
import { createScheduleRequestsSchema } from './create/schema'
import { createFindAllScheduleRequestsModule } from './find-all'
import { createRemoveScheduleRequestsModule } from './remove'
import { createUpdateScheduleRequestsModule } from './update'
import { updateScheduleRequestsSchema } from './update/schema'

const providersModel = createWinThorProvidersModel()
const scheduleRequestsModel = createPrismaScheduleRequestsModel(providersModel)

const createScheduleRequestModule = createCreateScheduleRequestModule(
  scheduleRequestsModel,
  providersModel
)
const findAllScheduleRequestsModule = createFindAllScheduleRequestsModule(
  scheduleRequestsModel
)
const removeScheduleRequestsModule = createRemoveScheduleRequestsModule(
  scheduleRequestsModel
)
const updateScheduleRequestsModule = createUpdateScheduleRequestsModule(
  scheduleRequestsModel,
  providersModel
)

export {
  createScheduleRequestModule,
  createScheduleRequestsSchema,
  findAllScheduleRequestsModule,
  removeScheduleRequestsModule,
  updateScheduleRequestsModule,
  updateScheduleRequestsSchema
}
