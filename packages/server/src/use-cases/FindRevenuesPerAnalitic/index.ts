import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerAnaliticController } from './FindRevenuesPerAnaliticController'
import { FindRevenuesPerAnaliticUseCase } from './FindRevenuesPerAnaliticUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerAnaliticUseCase = new FindRevenuesPerAnaliticUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerAnaliticController = new FindRevenuesPerAnaliticController(
  findRevenuesPerAnaliticUseCase
)

export { findRevenuesPerAnaliticController, findRevenuesPerAnaliticUseCase }
