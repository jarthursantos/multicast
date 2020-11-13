import { WinThorSupervisorRepository } from 'repositories/implementations/WinThorSupervisorRepository'

import { FindSupervisorsController } from './FindSupervisorsController'
import { FindSupervisorsUseCase } from './FindSupervisorsUseCase'

const winThorSupervisorRepository = new WinThorSupervisorRepository()

const findSupervisorsUseCase = new FindSupervisorsUseCase(
  winThorSupervisorRepository
)

const findSupervisorsController = new FindSupervisorsController(
  findSupervisorsUseCase
)

export { findSupervisorsUseCase, findSupervisorsController }
