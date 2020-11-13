import { WinThorDistribuitionRepository } from 'repositories/implementations/WinThorDistribuitionRepository'

import { FindDistribuitionsController } from './FindDistribuitionsController'
import { FindDistribuitionsUseCase } from './FindDistribuitionsUseCase'

const winThorDistribuitionRepository = new WinThorDistribuitionRepository()

const findDistribuitionsUseCase = new FindDistribuitionsUseCase(
  winThorDistribuitionRepository
)

const findDistribuitionsController = new FindDistribuitionsController(
  findDistribuitionsUseCase
)

export { findDistribuitionsUseCase, findDistribuitionsController }
