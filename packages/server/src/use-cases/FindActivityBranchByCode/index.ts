import { WinThorActivityBranchRepository } from 'repositories/implementations/WinThorActivityBranchRepository'

import { FindActivityBranchByCodeController } from './FindActivityBranchByCodeController'
import { FindActivityBranchByCodeUseCase } from './FindActivityBranchByCodeUseCase'

const winThorActivityBranchRepository = new WinThorActivityBranchRepository()

const findActivityBranchByCodeUseCase = new FindActivityBranchByCodeUseCase(
  winThorActivityBranchRepository
)

const findActivityBranchByCodeController = new FindActivityBranchByCodeController(
  findActivityBranchByCodeUseCase
)

export { findActivityBranchByCodeUseCase, findActivityBranchByCodeController }
