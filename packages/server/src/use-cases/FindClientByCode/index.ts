import { WinThorClientsRepository } from 'repositories/implementations/WinThorClientsRepository'

import { FindClientByCodeController } from './FindClientByCodeController'
import { FindClientByCodeUseCase } from './FindClientByCodeUseCase'

const winThorClientsRepository = new WinThorClientsRepository()

const findClientByCodeUseCase = new FindClientByCodeUseCase(
  winThorClientsRepository
)

const findClientByCodeController = new FindClientByCodeController(
  findClientByCodeUseCase
)

export { findClientByCodeUseCase, findClientByCodeController }
