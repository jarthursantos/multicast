import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerCheckOutController } from './FindRevenuesPerCheckOutController'
import { FindRevenuesPerCheckOutUseCase } from './FindRevenuesPerCheckOutUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerCheckOutUseCase = new FindRevenuesPerCheckOutUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerCheckOutController = new FindRevenuesPerCheckOutController(
  findRevenuesPerCheckOutUseCase
)

export { findRevenuesPerCheckOutController, findRevenuesPerCheckOutUseCase }
