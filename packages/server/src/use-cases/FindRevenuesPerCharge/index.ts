import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerChargeController } from './FindRevenuesPerChargeController'
import { FindRevenuesPerChargeUseCase } from './FindRevenuesPerChargeUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerChargeUseCase = new FindRevenuesPerChargeUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerChargeController = new FindRevenuesPerChargeController(
  findRevenuesPerChargeUseCase
)

export { findRevenuesPerChargeController, findRevenuesPerChargeUseCase }
