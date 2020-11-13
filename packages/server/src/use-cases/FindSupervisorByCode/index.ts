import { WinThorSupervisorRepository } from 'repositories/implementations/WinThorSupervisorRepository'

import { FindSupervisorByCodeController } from './FindSupervisorByCodeController'
import { FindSupervisorByCodeUseCase } from './FindSupervisorByCodeUseCase'

const winThorSupervisorRepository = new WinThorSupervisorRepository()

const findSupervisorByCodeUseCase = new FindSupervisorByCodeUseCase(
  winThorSupervisorRepository
)

const findSupervisorByCodeController = new FindSupervisorByCodeController(
  findSupervisorByCodeUseCase
)

export { findSupervisorByCodeUseCase, findSupervisorByCodeController }
