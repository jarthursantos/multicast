import { WinThorActivityBranchRepository } from 'repositories/implementations/WinThorActivityBranchRepository'

import { FindActivityBranchesController } from './FindActivityBranchesController'
import { FindActivityBranchesUseCase } from './FindActivityBranchesUseCase'

const winThorActivityBranchRepository = new WinThorActivityBranchRepository()

const findActivityBranchesUseCase = new FindActivityBranchesUseCase(
  winThorActivityBranchRepository
)

const findActivityBranchesController = new FindActivityBranchesController(
  findActivityBranchesUseCase
)

export { findActivityBranchesController, findActivityBranchesUseCase }
