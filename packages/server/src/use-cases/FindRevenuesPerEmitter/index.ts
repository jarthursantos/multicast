import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerEmitterController } from './FindRevenuesPerEmitterController'
import { FindRevenuesPerEmitterUseCase } from './FindRevenuesPerEmitterUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerEmitterUseCase = new FindRevenuesPerEmitterUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerEmitterController = new FindRevenuesPerEmitterController(
  findRevenuesPerEmitterUseCase
)

export { findRevenuesPerEmitterController, findRevenuesPerEmitterUseCase }
