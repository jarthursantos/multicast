import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerEvolutionController } from './FindRevenuesPerEvolutionController'
import { FindRevenuesPerEvolutionUseCase } from './FindRevenuesPerEvolutionUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerEvolutionUseCase = new FindRevenuesPerEvolutionUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerEvolutionController = new FindRevenuesPerEvolutionController(
  findRevenuesPerEvolutionUseCase
)

export { findRevenuesPerEvolutionController, findRevenuesPerEvolutionUseCase }
