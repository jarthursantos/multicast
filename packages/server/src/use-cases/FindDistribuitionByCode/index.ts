import { WinThorDistribuitionRepository } from 'repositories/implementations/WinThorDistribuitionRepository'

import { FindDistribuitionByCodeController } from './FindDistribuitionByCodeController'
import { FindDistribuitionByCodeUseCase } from './FindDistribuitionByCodeUseCase'

const winThorDistribuitionRepository = new WinThorDistribuitionRepository()

const findDistribuitionByCodeUseCase = new FindDistribuitionByCodeUseCase(
  winThorDistribuitionRepository
)

const findDistribuitionByCodeController = new FindDistribuitionByCodeController(
  findDistribuitionByCodeUseCase
)

export { findDistribuitionByCodeUseCase, findDistribuitionByCodeController }
