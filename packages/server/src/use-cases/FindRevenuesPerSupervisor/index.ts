import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerSupervisorController } from './FindRevenuesPerSupervisorController'
import { FindRevenuesPerSupervisorUseCase } from './FindRevenuesPerSupervisorUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerSupervisorUseCase = new FindRevenuesPerSupervisorUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerSupervisorController = new FindRevenuesPerSupervisorController(
  findRevenuesPerSupervisorUseCase
)

export { findRevenuesPerSupervisorController, findRevenuesPerSupervisorUseCase }
