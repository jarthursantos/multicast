import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerDeadlineController } from './FindRevenuesPerDeadlineController'
import { FindRevenuesPerDeadlineUseCase } from './FindRevenuesPerDeadlineUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerDeadlineUseCase = new FindRevenuesPerDeadlineUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerDeadlineController = new FindRevenuesPerDeadlineController(
  findRevenuesPerDeadlineUseCase
)

export { findRevenuesPerDeadlineController, findRevenuesPerDeadlineUseCase }
