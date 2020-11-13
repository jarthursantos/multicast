import { WinThorClientWebsRepository } from 'repositories/implementations/WinThorClientWebsRepository'

import { FindClientWebsController } from './FindClientWebsController'
import { FindClientWebsUseCase } from './FindClientWebsUseCase'

const winThorClientWebsRepository = new WinThorClientWebsRepository()

const findClientWebsUseCase = new FindClientWebsUseCase(
  winThorClientWebsRepository
)

const findClientWebsController = new FindClientWebsController(
  findClientWebsUseCase
)

export { findClientWebsUseCase, findClientWebsController }
