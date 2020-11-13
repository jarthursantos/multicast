import { WinThorRCARepository } from 'repositories/implementations/WinThorRCARepository'

import { FindRCAsController } from './FindRCAsController'
import { FindRCAsUseCase } from './FindRCAsUseCase'

const winThorRCARepository = new WinThorRCARepository()

const findRCAsUseCase = new FindRCAsUseCase(winThorRCARepository)

const findRCAsController = new FindRCAsController(findRCAsUseCase)

export { findRCAsController, findRCAsUseCase }
