import { WinThorBranchRepository } from 'repositories/implementations/WinThorBranchRepository'

import { FindBranchesController } from './FindBranchesController'
import { FindBranchesUseCase } from './FindBranchesUseCase'

const winThorBranchRepository = new WinThorBranchRepository()

const findBranchesUseCase = new FindBranchesUseCase(winThorBranchRepository)

const findBranchesController = new FindBranchesController(findBranchesUseCase)

export { findBranchesController, findBranchesUseCase }
