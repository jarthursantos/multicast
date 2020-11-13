import { WinThorRCARepository } from 'repositories/implementations/WinThorRCARepository'

import { FindRCAByCodeController } from './FindRCAByCodeController'
import { FindRCAByCodeUseCase } from './FindRCAByCodeUseCase'

const winThorRCARepository = new WinThorRCARepository()

const findRCAByCodeUseCase = new FindRCAByCodeUseCase(winThorRCARepository)

const findRCAByCodeController = new FindRCAByCodeController(
  findRCAByCodeUseCase
)

export { findRCAByCodeController, findRCAByCodeUseCase }
