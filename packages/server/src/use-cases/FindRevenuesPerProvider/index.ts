import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerProviderController } from './FindRevenuesPerProviderController'
import { FindRevenuesPerProviderUseCase } from './FindRevenuesPerProviderUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerProviderUseCase = new FindRevenuesPerProviderUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerProviderController = new FindRevenuesPerProviderController(
  findRevenuesPerProviderUseCase
)

export { findRevenuesPerProviderController, findRevenuesPerProviderUseCase }
