import { WinThorClientWebsRepository } from 'repositories/implementations/WinThorClientWebsRepository'

import { FindClientWebByCodeController } from './FindClientWebByCodeController'
import { FindClientWebByCodeUseCase } from './FindClientWebByCodeUseCase'

const winThorClientWebsRepository = new WinThorClientWebsRepository()

const findClientWebByCodeUseCase = new FindClientWebByCodeUseCase(
  winThorClientWebsRepository
)

const findClientWebByCodeController = new FindClientWebByCodeController(
  findClientWebByCodeUseCase
)

export { findClientWebByCodeController, findClientWebByCodeUseCase }
