import { WinThorClassRepository } from 'repositories/implementations/WinThorClassRepository'

import { FindClassesController } from './FindClassesController'
import { FindClassesUseCase } from './FindClassesUseCase'

const winThorClassRepository = new WinThorClassRepository()

const findClassesUseCase = new FindClassesUseCase(winThorClassRepository)

const findClassesController = new FindClassesController(findClassesUseCase)

export { findClassesController, findClassesUseCase }
