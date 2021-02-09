import { createMongoAgendaModel } from '~/models/agenda/MongoAgendaModel'
import { createWinThorBuyersModel } from '~/models/buyers/WinThorBuyersModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createPrismaUsersModel } from '~/models/users/PrismaUsersModel'

import { createAvailableHoursModule } from './available-hours'
import { createCreateAgendaModule } from './create'
import { createAgendaSchema } from './create/schema'
import { createFindByBuyerAgendaModule } from './find-by-buyer'
import { createFindByProviderAgendaModule } from './find-by-provider'
import { createFindManyAgendaModule } from './find-many'

const buyersModel = createWinThorBuyersModel()
const providersModel = createWinThorProvidersModel()
const usersModel = createPrismaUsersModel()
const agendaModel = createMongoAgendaModel(
  buyersModel,
  providersModel,
  usersModel
)

const availableHoursModule = createAvailableHoursModule(
  agendaModel,
  buyersModel
)
const createAgendaModule = createCreateAgendaModule(
  agendaModel,
  buyersModel,
  providersModel
)
const findManyAgendaModule = createFindManyAgendaModule(agendaModel)
const findByBuyerAgendaModule = createFindByBuyerAgendaModule(
  agendaModel,
  buyersModel
)
const findByProviderAgendaModule = createFindByProviderAgendaModule(
  agendaModel,
  providersModel
)

export {
  availableHoursModule,
  createAgendaModule,
  createAgendaSchema,
  findManyAgendaModule,
  findByBuyerAgendaModule,
  findByProviderAgendaModule
}
